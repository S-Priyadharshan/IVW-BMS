import './ActiveEquilibrium.css'
import { FaInfoCircle, FaBatteryFull, FaEquals } from 'react-icons/fa';

const ActiveEquilibrium = () => {
  return (
    <div className='active-equilibrium'>
        <div className='info'>
            <div className='info-div'> <FaBatteryFull /> Equilibrium state: <span> OFF</span></div>
            <div className='info-div'> <FaInfoCircle /> real-time current: <span>0 A</span></div>
            <div className='info-div'> <FaEquals /> equilibrium location: <span>0</span></div>
        </div>
        <div className="active-equilibrium-param">
            <p>equilibrium current: <span>none</span> <br></br><br></br><input type="text" /> <button>Set</button></p>
            <p>number of battery: <span>none</span> <br></br><br></br><input type="text" /> <button>Set</button></p>
            <p>equilibrium start volt: <span>none</span> <br></br><br></br><input type="text" /> <button>Set</button></p>
            <p>equilibrium diff volt: <span>none</span> <br></br><br></br><input type="text" /> <button>Set</button></p>
            <p>sleep time: <span>none</span> <br></br><br></br><input type="text" /> <button>Set</button></p>
        </div>
        <div className="configuration-controls">
            <button>Save Config</button>
            <button>Load Config</button>
            <button>Set All</button>
            <button>Read All</button>
        </div>
    </div>
  )
}

export default ActiveEquilibrium