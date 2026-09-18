import "../css/balance.css";
import { ChevronRight, Crown } from "lucide-react";
import gem from "../assets/gems.png";
import ves from "../assets/ves.png";

const Balance = ({ availableGems = 0, availableVEs = 0 }) => {
  const nextReward = 20
  const progress = Math.min(
    (availableGems / nextReward) * 100,
    100
  )

  return (
    <div className="bal">
      <div className="balance-card">
        <div className="balance-item">
          <div className="balance-icon gem-balance-icon">
            <img src={gem} alt="Gems" />
          </div>

          <div className="balance-content">
            <span className="balance-title">Your Gems</span>
            <div className="balance-value-row">
              <strong>{availableGems.toLocaleString()}</strong>
              <ChevronRight />
            </div>
          </div>
        </div>

        <div className="balance-divider"></div>

        <div className="balance-item">
          <div className="balance-icon ve-balance-icon">
            <img src={ves} alt="VEs" />
          </div>

          <div className="balance-content">
            <span className="balance-title">Your VEs</span>
            <div className="balance-value-row">
              <strong>{availableVEs.toLocaleString()}</strong>
              <ChevronRight />
            </div>
          </div>
        </div>

        <div className="balance-divider"></div>

        <div className="next-reward">
          <div className="reward-icon">
            <Crown />
          </div>

          <div className="reward-content">
            <span>Next Reward</span>
            <strong>
              {Math.max(nextReward - availableGems, 0).toFixed(3)} Gems away
            </strong>

            <div className="reward-progress">
              <div
                className="reward-progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;