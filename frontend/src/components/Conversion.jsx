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
  AlertCircle,
} from "lucide-react";
import "../css/conversion.css";

const API_URL = "http://localhost:5000";

const Conversion = ({
  availableGems = 0,
  onDirectConvert,
  onRewardCollected,
}) => {
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
  const [adSeconds, setAdSeconds] = useState(20);
  const [adReward, setAdReward] = useState(null);
  const [insufficientReward, setInsufficientReward] = useState(null);
  const [processing, setProcessing] = useState(false);

  const conversionTimerRef = useRef(null);
  const adTimerRef = useRef(null);

  const showInsufficient = (rewardId) => {
    setInsufficientReward(rewardId);

    if (conversionTimerRef.current) {
      clearTimeout(conversionTimerRef.current);
    }

    conversionTimerRef.current = setTimeout(() => {
      setInsufficientReward(null);
      conversionTimerRef.current = null;
    }, 3000);
  };

  const showConverted = (rewardId) => {
    setConverted(rewardId);

    if (conversionTimerRef.current) {
      clearTimeout(conversionTimerRef.current);
    }

    conversionTimerRef.current = setTimeout(() => {
      setConverted(null);
      conversionTimerRef.current = null;
    }, 10000);
  };

  const handleConvert = (reward) => {
    if (availableGems < reward.gems) {
      showInsufficient(reward.id);
      return;
    }

    setInsufficientReward(null);
    setSelectedReward(reward);
  };

  const handleConfirm = async () => {
    if (!selectedReward || processing) {
      return;
    }

    if (availableGems < selectedReward.gems) {
      const rewardId = selectedReward.id;

      setSelectedReward(null);
      showInsufficient(rewardId);

      return;
    }

    try {
      setProcessing(true);

      const response = await fetch(
        `${API_URL}/api/rewards/convert`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rewardId: selectedReward.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        const rewardId = selectedReward.id;

        setSelectedReward(null);
        showInsufficient(rewardId);

        return;
      }

      if (onDirectConvert) {
        onDirectConvert(data.balance);
      }

      const rewardId = selectedReward.id;

      setSelectedReward(null);
      setInsufficientReward(null);
      showConverted(rewardId);
    } catch (error) {
      console.error("Reward conversion failed:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = () => {
    if (processing) {
      return;
    }

    setSelectedReward(null);
  };

  const handleWatchAd = (e, reward) => {
    e.preventDefault();
    e.stopPropagation();

    if (showAd || processing) {
      return;
    }

    setAdReward(reward);
    setAdSeconds(20);
    setShowAd(true);
  };

  const handleCloseAd = () => {
    if (processing) {
      return;
    }

    if (adTimerRef.current) {
      clearInterval(adTimerRef.current);
      adTimerRef.current = null;
    }

    setShowAd(false);
    setAdReward(null);
    setAdSeconds(20);
  };

  const handleCollectReward = async () => {
    if (!adReward || adSeconds > 0 || processing) {
      return;
    }

    try {
      setProcessing(true);

      const response = await fetch(
        `${API_URL}/api/rewards/claim`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rewardId: adReward.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error(data.message || "Reward claim failed");
        return;
      }

      if (onRewardCollected) {
        onRewardCollected(data.balance);
      }

      const rewardId = adReward.id;

      if (adTimerRef.current) {
        clearInterval(adTimerRef.current);
        adTimerRef.current = null;
      }

      setShowAd(false);
      setAdReward(null);
      setAdSeconds(20);

      showConverted(rewardId);
    } catch (error) {
      console.error("Reward claim failed:", error);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (!showAd) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.overflow = "hidden";

    setAdSeconds(20);

    const timer = window.setInterval(() => {
      setAdSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          adTimerRef.current = null;
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    adTimerRef.current = timer;

    return () => {
      window.clearInterval(timer);
      adTimerRef.current = null;

      document.body.style.overflow = previousBodyOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [showAd]);

  useEffect(() => {
    return () => {
      window.clearTimeout(conversionTimerRef.current);
      window.clearInterval(adTimerRef.current);

      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
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
          const isInsufficient = insufficientReward === value.id;

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
                ) : isInsufficient ? (
                  <div className="insufficient-card-message">
                    <AlertCircle size={16} />
                    Insufficient Balance
                  </div>
                ) : (
                  <button
                    type="button"
                    className="convert-btn1"
                    onClick={() => handleConvert(value)}
                    disabled={processing}
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
                  onClick={(e) => handleWatchAd(e, value)}
                  disabled={processing}
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
              disabled={processing}
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
                disabled={processing}
              >
                No
              </button>

              <button
                type="button"
                className="modal-yes"
                onClick={handleConfirm}
                disabled={processing}
              >
                {processing ? "Processing..." : "Yes, Convert"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAd &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="reward-overlay"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="reward-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="reward-close"
                onClick={handleCloseAd}
                aria-label="Close reward screen"
                disabled={processing}
              >
                <X size={19} />
              </button>

              <div className="reward-header">
                <div className="reward-title">
                  <MonitorPlay size={17} />
                  <span>Sponsored Reward</span>
                </div>

                <span className="reward-sponsored">
                  SPONSORED
                </span>
              </div>

              <div className="reward-content">
                <div className="reward-logo">
                  <div className="reward-ring reward-ring-one"></div>
                  <div className="reward-ring reward-ring-two"></div>

                  <div className="reward-logo-center">
                    <MonitorPlay size={32} />
                  </div>
                </div>

                <h2>Reward Preview</h2>

                <p>
                  Please keep this advertisement open until the
                  timer finishes.
                </p>

                <div className="reward-loader">
                  <div
                    className="reward-loader-fill"
                    style={{
                      width: `${((20 - adSeconds) / 20) * 100}%`,
                    }}
                  ></div>
                </div>

                <div className="reward-message">
                  {adSeconds > 10
                    ? `Please wait ${adSeconds} seconds`
                    : adSeconds > 0
                    ? `Skip available • ${adSeconds} seconds remaining`
                    : "Advertisement completed"}
                </div>
              </div>

              <div className="reward-bottom">
                <div className="reward-bottom-left">
                  <span>Reward Preview</span>
                  <span>Secure</span>
                </div>

                <div className="reward-bottom-right">
                  {adSeconds > 10 ? (
                    <div className="reward-countdown">
                      <span>Ends in</span>
                      <strong>{adSeconds}s</strong>
                    </div>
                  ) : adSeconds > 0 ? (
                    <button
                      type="button"
                      className="reward-skip"
                      onClick={handleCloseAd}
                      disabled={processing}
                    >
                      Skip
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="reward-collect"
                      onClick={handleCollectReward}
                      disabled={processing}
                    >
                      <CheckCircle2 size={15} />
                      {processing ? "Processing..." : "Collect Reward"}
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
