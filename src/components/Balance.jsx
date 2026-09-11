import "../css/balance.css";
import { Info } from "lucide-react";
import gem from "../assets/gems.png";
import ves from "../assets/ves.png";

const Balance = ({ availableGems = 0, availableVEs = 0 }) => {
  return (
    <div className="bal">
      <div className="balance-card">
        <div className="balance-item">
          <div className="balance-icon gem-balance-icon">
            <img src={gem} alt="Gems" />
          </div>

          <div className="min">
            <div className="balance-content">
              <p className="avl">Available Gems</p>
              <h2>{availableGems.toLocaleString()}</h2>
              <span className="balance-label">Gems</span>
            </div>

            <Info className="balance-info" />
          </div>
        </div>

        <div className="balance-divider" />

        <div className="balance-item">
          <div className="balance-icon ve-balance-icon">
            <img src={ves} alt="VEs" />
          </div>

          <div className="min">
            <div className="balance-content">
              <p className="avl">Available VEs</p>
              <h2>{availableVEs.toLocaleString()}</h2>
              <span className="balance-label">VEs</span>
            </div>

            <Info className="balance-info" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;