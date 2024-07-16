// src/UpgradeComponent.jsx
import './UpgradeComponent.css';

const BMSUpgrade = () => {
    return (
        <div className="main-container">
          <div className="left-space"></div>
          <div className="right-controls">
            <div className="file-section">
              <button className="open-file-button" style={{color: 'black'}}>Open File</button>
            </div>
            <div className="upgrade-section">
              <select className="upgrade-dropdown">
                <option value="BMS Upgrade">BMS Upgrade</option>
              </select>
              <button className="start-upgrade-button">Start the upgrade</button>
              <div className="progress-circle">
                <span className="progress-text">0%</span>
              </div>
              {/* <div className="retry-counts">
                <label>RetryCounts:</label>
                <input type="text" className="retry-input" />
              </div> */}
            </div>
          </div>
        </div>
    );
};

export default BMSUpgrade;
