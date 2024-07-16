import serial
import time
import pymongo
import serial.tools.list_ports
import threading

mongo_uri = "mongodb://localhost:27017/"
database_name = "bmsdata"

client = pymongo.MongoClient(mongo_uri)
lock = threading.Lock()

db=client[database_name]

# Define the COM port and baud rate
port = 'COM3'  # Replace with your actual COM port
baud_rate = 9600

# Open the serial port
ser = serial.Serial(port, baud_rate, timeout=1)

# Function to send a command and receive response
def send_command(command_id):
    start_byte = 0xA5
    host_address = 0x40  # Upper computer address
    data_length = 0x08
    data = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]  # Reserved
    packet = [start_byte, host_address, command_id, data_length] + data
    checksum = sum(packet) & 0xFF
    packet.append(checksum)
    # ----------------------------------------------------------------
    # Convert packet to bytes and send
    ser.write(bytes(packet))
    
    # Wait for a brief moment to ensure data is sent
    time.sleep(0.1)

    # Read response
    response = ser.read(100)
    print(response)
    return list(response)
    # -----------------------------------------------------------------

# Function to parse response for Voltage, Current, SOC (0x90)
def get_pack_measurements(response):
    if response[0] == 0xA5 and response[2] == 0x90:
        cumulative_voltage = (response[4] << 8) | response[5]  # Cumulative total voltage (0.1 V)
        gather_voltage = (response[6] << 8) | response[7]       # Gather total voltage (0.1 V)
        current_offset = (response[8] << 8) | response[9]       # Current (30000 Offset, 0.1A)
        soc = (response[10] << 8) | response[11]                 # SOC (0.1%)

        return {
            "Cumulative Total Voltage": cumulative_voltage / 10.0,
            "Gather Total Voltage": gather_voltage / 10.0,
            "Current": (current_offset - 30000) / 10.0,
            "SOC": soc / 10.0
        }
    return None

# Function to parse response for Min & Max Cell Voltages (0x91)
def get_min_max_cell_voltage(response):
    if response[0] == 0xA5 and response[2] == 0x91:
        max_cell_voltage = (response[4] << 8) | response[3]  # Maximum cell voltage value (mV)
        max_cell_number = response[5]  # Number of cell with maximum voltage
        min_cell_voltage = (response[7] << 8) | response[6]  # Minimum cell voltage value (mV)
        min_cell_number = response[8]  # Number of cell with minimum voltage

        return {
            "Maximum Cell Voltage": max_cell_voltage / 1000.0,
            "Max Cell Number": max_cell_number,
            "Minimum Cell Voltage": min_cell_voltage / 1000.0,
            "Min Cell Number": min_cell_number
        }
    return None

# Function to parse response for Min & Max Temp Sensor readings (0x92)
def get_pack_temp(response):
    if response[0] == 0xA5 and response[2] == 0x92:
        max_temp = response[4] - 40  # Maximum temperature value (40 Offset, °C)
        max_temp_cell = response[5]  # Maximum temperature cell No
        min_temp = response[6] - 40  # Minimum temperature value (40 Offset, °C)
        min_temp_cell = response[7]  # Minimum temperature cell No

        return {
            "Maximum Temperature": max_temp,
            "Max Temp Cell": max_temp_cell,
            "Minimum Temperature": min_temp,
            "Min Temp Cell": min_temp_cell
        }
    return None

# Function to parse response for Charge/Discharge MOSFET state (0x93)
def get_discharge_charge_mos_status(response):
    if response[0] == 0xA5 and response[2] == 0x93:
        state = response[4]  # State (0 stationary, 1 charge, 2 discharge)
        charge_mos_state = response[5]  # Charge MOS state
        discharge_mos_state = response[6]  # Discharge MOS state
        bms_life = response[7]  # BMS life (0~255 cycles)
        remaining_capacity = (response[11] << 24) | (response[10] << 16) | (response[9] << 8) | response[8]  # Remaining capacity (mAH)

        return {
            "State": state,
            "Charge MOS State": charge_mos_state,
            "Discharge MOS State": discharge_mos_state,
            "BMS Life": bms_life,
            "Remaining Capacity": remaining_capacity
        }
    return None

# Function to parse response for Status Information 1 (0x94)
def get_status_info(response):
    if response[0] == 0xA5 and response[2] == 0x94:
        num_battery_strings = response[4]  # Number of battery strings
        num_temperatures = response[5]  # Number of temperature sensors
        charger_status = response[6]  # Charger status (0 disconnect, 1 access)
        load_status = response[7]  # Load status (0 disconnect, 1 access)
        di_state = response[8]  # Digital input state
        do_state = response[9]  # Digital output state

        return {
            "Number of Battery Strings": num_battery_strings,
            "Number of Temperature Sensors": num_temperatures,
            "Charger Status": charger_status,
            "Load Status": load_status,
            "DI State": di_state,
            "DO State": do_state
        }
    return None

def get_cell_voltages(response):
    split_sequence = [165, 1, 149, 8]

    # Initialize list to store split arrays
    split_responses = []
    current_segment = []

    # Flag to track if the first segment has been added
    first_segment_added = False

    # Iterate through response list
    for i in range(len(response)):
        current_segment.append(response[i])
        
        # Check if the end of the split sequence is reached
        if current_segment[-len(split_sequence):] == split_sequence:
            if first_segment_added:
                # Add the current segment as a split response
                split_responses.append(current_segment[:-len(split_sequence)])
            else:
                first_segment_added = True
            current_segment = []

    # Add the last segment if any
    if current_segment:
        split_responses.append(current_segment)
    frames_data=[]
    # Print each split segment
    for segment in split_responses:
        frames_data.append(segment[:7])

    converted_frames = []
    for frame in frames_data:
        frame_number = frame[0]
        voltages = []
        for i in range(1, len(frame), 2):  # Starting from index 1, step by 2
            voltage_mV = frame[i] * 256 + frame[i+1]  # Calculate millivolts (mV)
            voltage_V = voltage_mV / 1000.0  # Convert to volts (V)
            voltages.append(f"{voltage_V:.3f}V")
        
        # Append dictionary instead of tuple
        converted_frames.append({frame_number: voltages})
    
    return converted_frames

# Function to parse response for Temperature Sensors (0x96)
def get_cell_temperature(response):
    if response[0] == 0xA5 and response[2] == 0x96:
        frame_number = response[4]  # Frame number
        cell_temperatures = [temp - 40 for temp in response[4:12]]  # Cell temperatures (40 Offset, °C)

        return {
            "Frame Number": frame_number,
            "Cell Temperatures": cell_temperatures
        }
    return None

# Function to parse response for Cell Balance States (0x97)
def get_cell_balance_state(response):
    if response[0] == 0xA5 and response[2] == 0x97:
        frame_number = response[3]  # Frame number
        cell_balance_states = [bool(response[4] & (1 << i)) for i in range(8)]  # Cell balance states

        return {
            "Frame Number": frame_number,
            "Cell Balance States": cell_balance_states
        }
    return None

# Function to parse response for Failure Codes/Alarms (0x98)
def get_failure_codes(response):
    if response[0] == 0xA5 and response[2] == 0x98:
        failure_codes = response[4:12]  # Failure codes/alarms

        return {
            "Failure Codes": failure_codes
        }
    return None

# Mapping command IDs to their respective parsing functions
command_to_function = {
    0x90: get_pack_measurements,
    0x91: get_min_max_cell_voltage,
    0x92: get_pack_temp,
    0x93: get_discharge_charge_mos_status,
    0x94: get_status_info,
    0x95: get_cell_voltages,
    0x96: get_cell_temperature,
    0x97: get_cell_balance_state,
    0x98: get_failure_codes,
}

def save_to_mongodb(command_id, parsed_data):
    collection_name = f"command_{hex(command_id)}"
    collection = db[collection_name]

    if command_id == 0x95:
        #Insert parsed data in case of cell voltages
        parsed_data_str_keys = [{str(k): v for k, v in item.items()} for item in parsed_data]
        parent_doc = {
            "voltages": parsed_data_str_keys
        }
        
        insert_result = collection.insert_one(parent_doc)
        print(f"Inserted document ID: {insert_result.inserted_id}")
    else:
        # Insert parsed data into MongoDB
        insert_result = collection.insert_one(parsed_data)
        print(f"Inserted document ID: {insert_result.inserted_id}")


# parsed_data_list = []

def fetch_and_save_bms_data():
    try:
        parsed_data_list = []
        # Example usage: send each command and parse the response
        for command_id in command_to_function.keys():
            response = send_command(command_id)
            print(f"Response received for command {hex(command_id)}")

            # Ensure the response is not empty
            if len(response) > 0:
                # Parse the response using the appropriate function
                parsed_data = command_to_function[command_id](response)
                if parsed_data:
                    parsed_data_list.append(parsed_data)
                    if command_id == 0x95:
                        for frame_dict in parsed_data:
                            frame_number = next(iter(frame_dict))  # Get the frame number
                            voltages = frame_dict[frame_number]   # Get the voltages list
                            print(f"Frame {frame_number}: {voltages}")
                    else:
                        # Print other parsed data normally
                        for key, value in parsed_data.items():
                            print(f"  {key}: {value}")
                    # save_to_mongodb(command_id, parsed_data)
                else:
                    print(f"Failed to parse data for command {hex(command_id)}")
            else:
                print(f"No response or empty response for command {hex(command_id)}")
        return parsed_data_list
    except Exception as e:
        print(f"Error during fetching and saving: {str(e)}")
def cleanup():
    # Close the serial port when done
    if ser and ser.is_open:
        ser.close()
    #Close the mongo client when done
    if client:
        client.close()
# # -------------------------------------------------------------------------------------
command_id = 0x96
response = send_command(command_id)
print(response)
print(f"Response received for command {hex(command_id)}")

# Ensure the response is not empty
if len(response) > 0:
    # Parse the response using the appropriate function
    parsed_data = command_to_function[command_id](response)
    print(parsed_data)
    if parsed_data:
        if command_id == 0x95:
            for frame_dict in parsed_data:
                frame_number = next(iter(frame_dict))  # Get the frame number
                voltages = frame_dict[frame_number]   # Get the voltages list
                print(f"Frame {frame_number}: {voltages}")
        else:
            # Print other parsed data normally
            for key, value in parsed_data.items():
                print(f"  {key}: {value}")
    else:
        print(f"Failed to parse data for command {hex(command_id)}")
else:
   print(f"No response or empty response for command {hex(command_id)}")


# -------------------------------------------------------------------------------------
