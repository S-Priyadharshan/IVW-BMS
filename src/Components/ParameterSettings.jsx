// src/ParameterSettings.jsx
import './ParameterSettings.css';

const ParameterSettings = () => {
  return (
    <div className="parameter-settings">
      <h1>Parameter Settings</h1>
      
      <div className="section">
        <h2>Active Equilibrium Information</h2>
        <div className="equilibrium-state">
          <p><span className="icon">⚖️</span> equilibrium state: <span className="status">OFF</span></p>
          <p><span className="icon">🔌</span> real-time current: <span className="status">0A</span></p>
          <p><span className="icon">📍</span> equilibrium location: <span className="status">0</span></p>
        </div>
      </div>

      <div className="section">
        <h2>Active Equilibrium Parameters</h2>
        <div className="active-equilibrium-param">
          <div className="param-row">
            <p>Rated Cap(Ah): <input type="text" /> <button>Set</button></p>
            <p>Balance start Volt(V): <input type="text" /> <button>Set</button></p>
            <p>Sleep time(S): <input type="text" /> <button>Set</button></p>
          </div>
          <div className="param-row">
            <p>Rated CellVolt(V): <input type="text" /> <button>Set</button></p>
            <p>Bal start diff Volt(V): <input type="text" /> <button>Set</button></p>
            <p>Current wave(A): <input type="text" /></p>
          </div>
          <div className="param-row">
            <p>Cumulative charge(Ah): <input type="text" /> <button>Set</button></p>
            <p>Short Current(A): <input type="text" /> <button>Set</button></p>
            <p>Battery production date: <input type="text" /></p>
          </div>
          <div className="param-row">
            <p>Cumulative discharge(Ah): <input type="text" /></p>
            <p>Cur sampling Res(mΩ): <input type="text" /></p>
            <p>Battery type: 
              <select>
                <option>ternary lithium</option>
                <option>lithium iron</option>
                <option>lithium titanate</option>
              </select>
            </p>
          </div>
          <div className="param-row">
            <p>No. of acquisition board: <input type="text" /></p>
            <p>board 1~3 Cell No.: <input type="text" /> <button>Set</button></p>
            <p>Battery operation mode: 
              <select>
                <option>long press power on/off</option>
                <option>short press power on/off</option>
              </select>
            </p>
          </div>
          <div className="param-row">
            <p>board 1~3 NTC No.: <input type="text" /></p>
          </div>
          <div className="param-row">
            <p>Firmware Index No.: <input type="text" /> <button>Set</button></p>
            <p>RTC: <input type="text" /></p>
            <p>SOC: <input type="text" /> <button>Set</button></p>
          </div>
          <div className="param-row">
            <p>Battery code: <input type="text" /></p>
            <p>IP: <input type="text" /> <button>Set</button></p>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Additional Settings</h2>
        <div className="additional-settings">
          <table>
            <thead>
              <tr>
                <th>Lev</th>
                <th>cell volt high</th>
                <th>cell volt low</th>
                <th>sum volt high</th>
                <th>sum volt low</th>
                <th>discharge curr large</th>
                <th>charge curr large</th>
                <th>volt diff large</th>
                <th>temp diff large</th>
                <th>SOC high</th>
                <th>SOC low</th>
                <th>charge temp high</th>
                <th>charge temp low</th>
                <th>discharge temp high</th>
                <th>discharge temp low</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
              </tr>
              <tr>
                <td>2</td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
                <td><input type="text" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="configuration-controls">
        <button>Quick Set</button>
        <button>Load config</button>
        <button>Save config</button>
        <button>Set all</button>
      </div>
    </div>
  );
};

export default ParameterSettings;
