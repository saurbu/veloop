import "../css/balance.css";
import { Info } from "lucide-react";
import gem from '../assets/gems.png'
import ves from '../assets/ves.png'

const Balance = () => {
  return (
    <div className="bal">
      <div className="balance-card">
        <div className="balance-item">
          <div className="balance-icon gem-balance-icon">
            <div className="gem-wrapper">
              <img src={gem} alt="gem" />
            </div>
          </div>

          <div className="balance-content">
            <p className="avl">Available Gems</p>
            <h2>420</h2>
            <span className="balance-label">Gems</span>
          </div>

          <Info className="balance-info" />
        </div>

        <div className="balance-divider" />

        <div className="balance-item">
          <div className="balance-icon">
            <div className="coin-wrapper">
              <img src={ves} alt="" />
            </div>
          </div>

          <div className="balance-content">
            <p className="avl">Available VEs</p>
            <h2>3,850</h2>
            <span className="balance-label">VEs</span>
          </div>

          <Info className="balance-info" />
        </div>
      </div>
    </div>
  );
};

export default Balance;