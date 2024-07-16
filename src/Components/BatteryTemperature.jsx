import './BatteryTemp.css';

export default function BatteryTemperature() {
    return (
        <div className="battery-temperature">
            <div className="section-title">Battery temperature</div>
            <table>
                <tbody>
                    <tr><td>1</td><td>30 &deg;C</td></tr>
                    {/* <tr><td>11~16:</td><td></td><td></td><td></td><td></td></tr> */}
                </tbody>
            </table>
        </div>
    );
}
