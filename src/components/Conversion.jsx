import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  CheckCircle2,
  X,
  ShieldCheck,
  MonitorPlay,
  Gem,
  Zap,
  Sparkles,
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
  const [showAd, setShowAd] = useState(false);
  const [adSeconds, setAdSeconds] = useState(10);

  const conversionTimerRef = useRef(null);

  const handleConvert = (reward) => {
    setSelectedReward(reward);
  };

  const handleConfirm = () => {
    if (!selectedReward) return;

    const rewardId = selectedReward.id;

    setConverted(rewardId);
    setSelectedReward(null);

    if (conversionTimerRef.current) {
      clearTimeout(conversionTimerRef.current);
    }

    conversionTimerRef.current = setTimeout(() => {
      setConverted(null);
      conversionTimerRef.current = null;
    }, 10000);
  };

  const handleCancel = () => {
    setSelectedReward(null);
  };

  const handleWatchAd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (showAd) return;

    setAdSeconds(10);
    setShowAd(true);
  };

  const handleCloseAd = () => {
    if (adSeconds > 0) return;

    setShowAd(false);
    setAdSeconds(10);
  };

  useEffect(() => {
    if (!showAd) return;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    setAdSeconds(10);

    let timer;

    timer = window.setInterval(() => {
      setAdSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [showAd]);

  useEffect(() => {
    return () => {
      window.clearTimeout(conversionTimerRef.current);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, []);

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
                <span className="status-text">{value.status}</span>
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

              <div className="watch-ad-box">
                <button
                  type="button"
                  className="watch-ad"
                  onClick={handleWatchAd}
                >
                  <MonitorPlay size={14} />
                  Watch Ad to proceed
                </button>
              </div>
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

      {showAd &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="ad-overlay"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="ad-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={`ad-close ${
                  adSeconds > 0 ? "ad-close-disabled" : ""
                }`}
                onClick={handleCloseAd}
                disabled={adSeconds > 0}
                aria-label="Close advertisement"
              >
                <X size={19} />
              </button>

              <div className="ad-header">
                <div className="ad-title">
                  <MonitorPlay size={17} />
                  <span>Advertisement</span>
                </div>

                <span className="ad-sponsored">
                  ADVERTISEMENT
                </span>
              </div>

              <div className="ad-content">
                <div className="ad-logo">
                  <div className="ad-ring ring-one"></div>
                  <div className="ad-ring ring-two"></div>

                  <div className="ad-logo-center">
                    <MonitorPlay size={32} />
                  </div>
                </div>

                <h2>Reward Ad</h2>

                <p>
                  Please keep this advertisement open until the
                  timer finishes.
                </p>

                <div className="ad-loader">
                  <div
                    className="ad-loader-fill"
                    style={{
                      width: `${((10 - adSeconds) / 10) * 100}%`,
                    }}
                  ></div>
                </div>

                <div className="ad-message">
                  {adSeconds > 0
                    ? `Please wait ${adSeconds} seconds`
                    : "Advertisement completed"}
                </div>
              </div>

              <div className="ad-bottom">
                <div className="ad-bottom-left">
                  <span>Reward Advertisement</span>
                  <span>Secure</span>
                </div>

                <div className="ad-bottom-right">
                  {adSeconds > 0 ? (
                    <div className="ad-countdown">
                      <span>Ad ends in</span>
                      <strong>{adSeconds}s</strong>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="ad-skip"
                      onClick={handleCloseAd}
                    >
                      Skip Ad
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Conversion;