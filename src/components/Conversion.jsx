import { useState } from "react";
import { ArrowRight, CheckCircle2, X, ShieldCheck, MonitorPlay } from "lucide-react";
import "../css/conversion.css";
import video from "../assets/video.webm";

const Conversion = () => {
  const gems = [
    { id: 1, name: "Daily Gem Boost", status: "Popular", gems: "33", ve: "178", color: "blue" },
    { id: 2, name: "Super Reward", status: "Best Value", gems: "35", ve: "216", color: "gold" },
    { id: 3, name: "Mega Reward", status: "Daily", gems: "30", ve: "162", color: "blue" }
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
        <h1>Fast Conversions</h1>
        <p>Find the best conversion option for your Gems</p>
      </div>

      <div className="container-card">
        {gems.map((value) => (
          <div
            key={value.id}
            className={`cont-cnvrsn ${value.color}`}
          >
            <div className="card-name">
              <h4>{value.name}</h4>
              <p className={`status ${value.color}`}>{value.status}</p>
            </div>

            <div className="content">
              <div className="video">
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>

              <div className="grm">
                <div className="arw">
                  <h4>
                    {value.gems} <span className="txt-gem">Gems</span>
                  </h4>

                  <div className="arrow">
                    <span />
                    <span />
                  </div>

                  <h4>
                    {value.ve} <span className="txt-ve">VEs</span>
                  </h4>
                </div>

                {converted === value.id ? (
                  <div className="converted-message">
                    <CheckCircle2 size={17} />
                    Reward Converted
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleConvert(value)}
                  >
                    Convert Reward
                  </button>
                )}

                <p><MonitorPlay size={16}/> Watch ad</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedReward && (
        <div className="conversion-modal-overlay" onClick={handleCancel}>
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