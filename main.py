import eventlet
eventlet.monkey_patch()

from flask import Flask, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from Data import fetch_and_save_bms_data, cleanup
# import time

import signal 
import sys

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
complete_data = {}

def fetch_bms_data_periodically():
    global complete_data
    while True:
        try:
            new_data = fetch_and_save_bms_data()

            for data in new_data:
                if isinstance(data, dict):
                    complete_data.update(data)
                elif isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict):
                    # Assuming the last list element represents cell voltages
                    cell_voltages = {}
                    for item in data:
                        key = next(iter(item))  # Get the first (and only) key
                        cell_voltages[key] = item[key]
                    complete_data['cell_voltages'] = cell_voltages
                else:
                    print(f"Unhandled data format: {data}")

            print("Updated complete_data:", complete_data)
            socketio.emit('update_data', complete_data)

            eventlet.sleep(5)
        except KeyboardInterrupt:
            print("Stopping data fetching...")
            cleanup()
            break

@app.route("/api/bms-data", methods=['GET'])
def get_info():
    return jsonify(complete_data)

def signal_handler(Sig, frame):
    print('Caught interrupt signal, exiting gracefully')
    cleanup()
    sys.exit(0)

if __name__ == "__main__":
    signal.signal(signal.SIGINT, signal_handler)
    # Start the data-fetching function as a background task
    socketio.start_background_task(target=fetch_bms_data_periodically)
    socketio.run(app, debug=True, use_reloader=False)
