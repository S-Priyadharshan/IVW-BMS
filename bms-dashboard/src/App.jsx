/* eslint-disable */
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import CellVoltage from './Components/CellVoltage';
import BatteryStatus from './Components/BatteryStatus';
import BatteryTemperature from './Components/BatteryTemperature';
import { Router, Routes, Route } from 'react-router-dom';
import ActiveEquilibrium from './Components/ActiveEquilibrium';
import ParameterSettings from './Components/ParameterSettings';
import Readparam from "./Components/Readparam";
import ExtParameter from './Components/ExtParameter';
import EngineeringModel from './Components/EngineeringModel';
import AlarmHistory from './Components/AlarmHistory';
import BMSUpgrade from './Components/BMSUpgrade';

function App() {
    const [data, setData] = useState(null);
  useEffect(() => {


    const socket = socketIOClient('http://localhost:5000');

    socket.on('update_data', (newData) =>{
      setData(newData);
    });
    

    return () => socket.disconnect();
  }, []);

  return(
            <div>
                <Header />
                <div style={{ display: 'flex'}}>
                    <Navbar />
                    <div style={{ marginLeft: '4rem', padding: '1rem' }}>
                        <Routes>
                            <Route path="/" element={[<BatteryStatus />,<CellVoltage />,<BatteryTemperature />]} />
                            <Route path="/active-equilibrium" element={<ActiveEquilibrium />} />
                            <Route path="/parameter-settings" element={<ParameterSettings />} />
                            <Route path="/readparam" element={<Readparam />} />
                            <Route path="/ext-parameter" element={<ExtParameter />} />
                            <Route path="/engineering-model" element={<EngineeringModel />} />
                            <Route path="/alarm-history" element={<AlarmHistory />} />
                            <Route path="/bms-upgrade" element={<BMSUpgrade />} />
                        </Routes>
                    </div>
                </div>
            </div>
  );
}

export default App
