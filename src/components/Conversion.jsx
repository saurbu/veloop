import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  X,
  ShieldCheck,
  MonitorPlay,
  Sparkles,
  Gem,
  Zap,
} from "lucide-react";
import "../css/conversion.css";
import video from "../assets/video.webm";

const Conversion = () => {
  const gems = [
    {
      id: 1,
      name: "Daily Gem Boost",
      status: "Popular",
      gems: "33",
      ve: "178",
      color: "blue",
      description: "Perfect for your daily rewards",
    },
    {
      id: 2,
      name: "Super Reward",
      status: "Best Value",
      gems: "35",
      ve: "216",
      color: "gold",
      description: "Get more value from your Gems",
    },
    {
      id: 3,
      name: "Mega Reward",
      status: "Daily",
      gems: "30",
      ve: "162",
      color: "blue",
      description: "Quick daily conversion",
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
      <div className="cnv">
        <div className="title-row">
          <div className="title-icon">
            <Sparkles size={18} />
          </div>
          <div>
            <h1>Fast Conversions</h1>
            <p>Find the best conversion option for your Gems</p>
          </div>
        </div>
      </div>

      <div className="container-card">
        {gems.map((value) => (
          <div
            key={value.id}
            className={`cont-cnvrsn ${value.color} ${
              converted === value.id ? "is-converted" : ""
            }`}
          >
            <div className="card-glow" />

            <div className="video">
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
              />

            </div>

            <div className="card-content">
              <div className="card-top">
                <div className="card-title">
                  <div className="reward-icon">
                    <Gem size={17} />
                  </div>
                  <div>
                    <h4>{value.name}</h4>
                    <span>{value.description}</span>
                  </div>
                </div>

                <p className={`status ${value.color}`}>
                  {value.status}
                </p>
              </div>

              <div className="conversion-box">
                <div className="conversion-item">
                  <span className="conversion-label">SPEND</span>
                  <div className="conversion-value gems-value">
                    <Gem size={17} />
                    <strong>{value.gems}</strong>
                  </div>
                  <small>Gems</small>
                </div>

                <div className="conversion-arrow">
                  <ArrowRight size={18} />
                </div>

                <div className="conversion-item">
                  <span className="conversion-label">RECEIVE</span>
                  <div className="conversion-value ve-value">
                    <Zap size={17} />
                    <strong>{value.ve}</strong>
                  </div>
                  <small>VEs</small>
                </div>
              </div>

              <div className="conversion-rate">
                <span>Conversion rate</span>
                <strong>
                  1 Gem <ArrowRight size={12} />
                  {(Number(value.ve) / Number(value.gems)).toFixed(2)} VEs
                </strong>
              </div>

              <div className="card-bottom">
                <div className="watch-ad">
                  <MonitorPlay size={14} />
                  Watch ad
                </div>

                <div className="card-action">
                  {converted === value.id ? (
                    <div className="converted-message">
                      <CheckCircle2 size={17} />
                      Reward Converted
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="convert-btn1"
                      onClick={() => handleConvert(value)}
                    >
                      <span>Convert Reward</span>
                      <ArrowRight size={17} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
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
                <strong>{selectedReward.name}</strong>
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