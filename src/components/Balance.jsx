import "../css/balance.css";
import { Info } from "lucide-react";

const Balance = () => {
  return (
    <div className="bal">
      <div className="balance-card">
        <div className="balance-item">
          <div className="balance-icon gem-balance-icon">
            <div className="gem-wrapper">
              <div className="gem">
                <div className="gem-face gem-top" />
                <div className="gem-face gem-left" />
                <div className="gem-face gem-right" />
                <div className="gem-face gem-bottom" />
              </div>
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
              <div className="coin">
                <div className="coin-inner">
                  <span>VE</span>
                </div>
              </div>
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