import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  X,
  ShieldCheck,
  MonitorPlay,
  Gem,
  Zap,
  Sparkles
} from "lucide-react";
import "../css/conversion.css";

const Conversion = () => {
  const gems = [
    {
      id: 1,
      status: "Most Popular",
      gems: 28,
      ve: 151,
      color: "purple",
      icon: "🔥",
    },
    {
      id: 2,
      status: "Best Value",
      gems: 39,
      ve: 220,
      color: "blue",
      icon: "★",
    },
    {
      id: 3,
      status: "High Conversion",
      gems: 56,
      ve: 330,
      color: "green",
      icon: "↗",
    },
  ];

  const [selectedReward, setSelectedReward] = useState(null);
  const [converted, setConverted] = useState(null);

  const handleConvert = (reward) => {
    setSelectedReward(reward);
  };

  const handleConfirm = () => {
    if (!selectedReward) return;
    setConverted(selectedReward.id);
    setSelectedReward(null);
  };

  const handleCancel = () => {
    setSelectedReward(null);
  };

  return (
    <div className="con">
      <div className="conversion-heading">
        <div className="conversion-heading-icon">
          <Sparkles size={20} />
        </div>

        <div>
          <h1>Available Conversions</h1>
          <p>Choose the best conversion option for your Gems.</p>
        </div>
      </div>
      <div className="container-card">
        
        {gems.map((value) => {
          const rate = (value.ve / value.gems).toFixed(2);

          return (
            <div
              key={value.id}
              className={`cont-cnvrsn ${value.color} ${
                converted === value.id ? "is-converted" : ""
              }`}
            >
              <div className="card-status">
                <span className="status-icon">{value.icon}</span>
                {value.status}
              </div>

              <div className="conversion-main">
                <div className="gem-section">
                  <div className="gem-circle">
                    <Gem size={26} />
                  </div>

                  <strong>{value.gems} Gems</strong>
                </div>

                <div className="main-arrow">
                  <ArrowRight size={28} />
                </div>

                <div className="ve-section">
                  <div className="ve-circle">
                    <span>VE</span>
                  </div>

                  <strong>{value.ve} VEs</strong>
                </div>
              </div>

              <div className="conversion-rate">
                1 Gem = {rate} VEs
                <span className="info-icon">i</span>
              </div>

              <div className="card-action">
                {converted === value.id ? (
                  <div className="converted-message">
                    <CheckCircle2 size={16} />
                    Reward Converted
                  </div>
                ) : (
                  <button
                    type="button"
                    className="convert-btn1"
                    onClick={() => handleConvert(value)}
                  >
                    <span className="convert-icon">
                      <Zap size={14} />
                    </span>
                    Convert Now
                  </button>
                )}
              </div>

              <button type="button" className="watch-ad">
                <MonitorPlay size={14} />
                Watch Ad to proceed
              </button>
            </div>
          );
        })}
      </div>

      {selectedReward && (
        <div
          className="conversion-modal-overlay"
          onClick={handleCancel}
        >
          <div
            className="conversion-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={handleCancel}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="modal-icon">
              <ShieldCheck size={27} />
            </div>

            <h2>Confirm Conversion</h2>

            <p className="modal-description">
              Are you sure you want to convert this reward?
            </p>

            <div className="modal-reward">
              <div className="modal-reward-info">
                <span>Reward</span>
                <strong>{selectedReward.status}</strong>
              </div>

              <div className="modal-conversion">
                <div>
                  <span>Spend</span>
                  <strong className="modal-gems">
                    {selectedReward.gems} Gems
                  </strong>
                </div>

                <ArrowRight size={20} />

                <div>
                  <span>Receive</span>
                  <strong className="modal-ve">
                    {selectedReward.ve} VEs
                  </strong>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-no"
                onClick={handleCancel}
              >
                No
              </button>

              <button
                type="button"
                className="modal-yes"
                onClick={handleConfirm}
              >
                Yes, Convert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversion;