/* eslint-disable */
import './Navbar.css';
import { Link } from 'react-router-dom'
export default function Navbar() {
    return (
        <div className="navbar">
            <nav className="navbar-span">
                <Link to='/'>Home</Link>
                <Link to="/active-equilibrium">Active Equilibrium</Link>
                <Link to="/parameter-settings">Parameter Settings</Link>
                <Link to="/readparam">Readparam</Link>
                <Link to="/ext-parameter">Ext. Parameter</Link>
                <Link to="/engineering-model">Engineering Model</Link>
                <Link to="/alarm-history">Alarm History</Link>
                <Link to="/bms-upgrade">BMS Upgrade</Link>
            </nav>
        </div>
    );
}
