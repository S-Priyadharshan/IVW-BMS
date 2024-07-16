import './BatteryStatus.css';

export default function BatteryStatus() {
    return (
        <div className="battery-status">
            <div className="status-section">
                <div>Max Volt: <span>3.29 V</span></div>
                <div>Max Cell Pos: <span>13</span></div>
                <div>Max Temp: <span>31 ℃</span></div>
                <div>Max Temp Pos: <span>4</span></div>
                <div>Chg Mos: <span>OFF</span></div>
            </div>
            <div className="status-section">
                <div>Min Volt: <span>3.279 V</span></div>
                <div>Min Cell Pos: <span>1</span></div>
                <div>Min Temp: <span>30 ℃</span></div>
                <div>Min Temp Pos: <span>1</span></div>
                <div>Dischg Mos: <span>OFF</span></div>
            </div>
            <div className="status-section">
                <div>Cells num: <span>19</span></div>
                <div>NTC num: <span>4</span></div>
                <div style={{color: 'white'}}> Invisible</div>
                <div>Remain cap: <span>29.82 Ah</span></div>
                <div>BMS Life: <span>227</span></div>
            </div>
            <div className="status-section">
                <div>DI1 status: <span>OFF</span></div>
                <div>DI2 status: <span>OFF</span></div>
                <div>DI3 status: <span>OFF</span></div>
                <div>DI4 status: <span>ON</span></div>
                <div>Cycle Times: <span>264</span></div>
            </div>
            <div className="status-section">
                <div>DO1 status: <span>OFF</span></div>
                <div>DO2 status: <span>OFF</span></div>
                <div style={{color: 'white'}}> Invisible</div>
                <div>DO3 status: <span>OFF</span></div>
                <div>DO4 status: <span>OFF</span></div>
            </div>
            <div className="status-section">
                <div>SOH: <span>95.9%</span></div>
                <div>Charging SOP: <span>30A</span></div>
                <div>Discharg SOP: <span>30A</span></div>
            </div>
        </div>
    );
}
