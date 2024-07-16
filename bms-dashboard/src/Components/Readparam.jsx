
const ReadParam = () => {
  return (
    <div className="parameter-settings">
    <h1>Readparam</h1>
    <div className="section">
      <h2>Active Equilibrium Parameters</h2>
      <div className="active-equilibrium-param">
        <div className="param-row">
          <p>Rated Cap(Ah): <input type="text" /> <button>Read</button></p>
          <p>Balance start Volt(V): <input type="text" /> <button>Read</button></p>
          <p>Sleep time(S): <input type="text" /> <button>Read</button></p>
        </div>
        <div className="param-row">
          <p>Rated CellVolt(V): <input type="text" /> <button>Read</button></p>
          <p>Bal start diff Volt(V): <input type="text" /> <button>Read</button></p>
          <p>Current wave(A): <input type="text" /></p>
        </div>
        <div className="param-row">
          <p>Cumulative charge(Ah): <input type="text" /> <button>Read</button></p>
          <p>Short Current(A): <input type="text" /> <button>Read</button></p>
          <p>Battery production date: <input type="text" /></p>
        </div>
        <div className="param-row">
          <p>Cumulative discharge(Ah): <input type="text" /></p>
          <p>Cur sampling Res(mΩ): <input type="text" /></p>
          <p>Battery production date: <input type="text"/></p>
        </div>
        <div className="param-row">
          <p>No. of acquisition board: <input type="text" /></p>
          <p>board 1~3 Cell No.: <input type="text" /> <button>Read</button></p>
          <p>Battery operation mode: <input type="text"/> <button>Read</button></p>
        </div>
        <div className="param-row">
          <p>board 1~3 NTC No.: <input type="text" /></p>
        </div>
        <div className="param-row">
          <p>Firmware Index No.: <input type="text" /> <button>Read</button></p>
          <p>RTC: <input type="text" /></p>
          <p>SOC: <input type="text" /> <button>Read</button></p>
        </div>
        <div className="param-row">
          <p>Battery code: <input type="text" /></p>
          <p>IP: <input type="text" /> <button>Read</button></p>
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
      <button>Read All</button>
    </div>
  </div>
  )
}

export default ReadParam