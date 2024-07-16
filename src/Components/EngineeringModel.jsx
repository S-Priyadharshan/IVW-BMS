import './EngineeringModel.css';

const EngineeringModel = () => {
    return (
        <div className="engineering-model">
            <div className="section control-manager">
                <h2>Control Manager</h2>
                <div className="button-group">
                    <button className="control-button">Balance testing</button>
                    <button className="control-button">Current 0A calibration</button>
                    <button className="control-button">BMS Sleep</button>
                    <button className="control-button">Current calibration</button>
                    <button className="control-button">Restart BMS</button>
                    <button className="control-button">Current accuracy test</button>
                </div>
                <div className="action-buttons">
                    <button className="action-button">Read</button>
                    <button className="action-button">Set</button>
                </div>
            </div>

            <div className="section wakeup-method">
                <h2>WakeUpMethod</h2>
                <div className="button-group">
                    <button className="method-button">Key</button>
                    <button className="method-button">Button</button>
                    <button className="method-button">485</button>
                    <button className="method-button">CAN</button>
                    <button className="method-button">Current</button>
                </div>
            </div>

            <div className="section control-switch">
                <h2>Control Switch</h2>
                <div className="switch-group">
                    <label>ChgControl:</label>
                    <div className="switch">OFF</div>
                    <label>DsgControl:</label>
                    <div className="switch">OFF</div>
                    <label>DO1 Control:</label>
                    <div className="switch">OFF</div>
                </div>
            </div>

            <div className="section bms-address-manager">
                <h2>BMS address manager</h2>
                <div className="input-group">
                    <label>BoardNo:</label>
                    <input type="text" />
                    <label>SlaveNum:</label>
                    <input type="text" />
                </div>
                <div className="action-buttons">
                    <button className="action-button">Read</button>
                    <button className="action-button">Set</button>
                </div>
            </div>

            <div className="section fan-control">
                <div className="input-group">
                    <label>Fan ON(°C):</label>
                    <input type="text" />
                    <label>MosTemp:</label>
                    <input type="text" />
                </div>
                <div className="input-group">
                    <label>Heat ON(°C):</label>
                    <input type="text" />
                    <label>Key control MOS:</label>
                    <select>
                        <option>Disable</option>
                        <option>mos and sleep</option>
                        <option>discharge mos</option>
                    </select>
                </div>
                <div className="action-buttons">
                    <button className="action-button">Read</button>
                    <button className="action-button">Set</button>
                </div>
            </div>

            <div className="section inverter-manager">
                <h2>Inverter Manager</h2>
                <div className="input-group">
                    <select>
                        <option>NONE</option>
                        <option>PYLON</option>
                        <option>GROWATT</option>
                        <option>SOFAR</option>
                        <option>VOLTRONICPOWER</option>
                        <option>GOODWE</option>
                        <option>SRNE</option>
                        <option>MUST</option>
                        <option>VICTORNENERGY</option>
                    </select>
                    <label>Inverter Manager</label>
                </div>
                <div className="input-group">
                    <select>
                        <option>RS485</option>
                        <option>CAN</option>
                    </select>
                    <label>Comm Type</label>
                </div>
                <div className="action-buttons">
                    <button className="action-button">Select</button>
                    <button className="action-button">Read</button>
                </div>
            </div>
        </div>
    );
};

export default EngineeringModel;
