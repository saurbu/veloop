import { useState } from "react";
import {
  ArrowRight,
  ArrowLeftRight,
  Info,
  X,
  CheckCircle,
} from "lucide-react";
import "../css/ExchangeCard.css";

const GEM_TO_VE = 5.39;
const MAX_GEMS = 1000;

const ExchangeCard = () => {
  const [amount, setAmount] = useState("");
  const [swapped, setSwapped] = useState(false);
  const [preview, setPreview] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [converted, setConverted] = useState(false);

  const numericAmount = Number(amount);

  const outputAmount =
    amount !== "" && !isNaN(numericAmount) && numericAmount > 0
      ? swapped
        ? (numericAmount / GEM_TO_VE).toFixed(2)
        : (numericAmount * GEM_TO_VE).toFixed(2)
      : "0";

  const handleAmountChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setAmount("");
      setPreview(false);
      setConverted(false);
      return;
    }

    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setPreview(false);
      setConverted(false);
    }
  };

  const handleMax = () => {
    if (swapped) {
      const maxVE = (MAX_GEMS * GEM_TO_VE).toFixed(2);

      setAmount(maxVE);
    } else {
      setAmount(MAX_GEMS.toString());
    }

    setPreview(false);
    setConverted(false);
  };

  const handleSwap = () => {
    if (amount !== "" && !isNaN(Number(amount))) {
      const currentAmount = Number(amount);

      if (swapped) {
        setAmount((currentAmount / GEM_TO_VE).toFixed(2));
      } else {
        setAmount((currentAmount * GEM_TO_VE).toFixed(2));
      }
    }

    setSwapped((prev) => !prev);
    setPreview(false);
    setConverted(false);
  };

  const handlePreview = () => {
    if (
      amount === "" ||
      isNaN(Number(amount)) ||
      Number(amount) <= 0
    ) {
      return;
    }

    setPreview(true);
    setConverted(false);
  };

  const handleConvertClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmConversion = () => {
    setShowConfirm(false);
    setConverted(true);

    // backend
    // await fetch("/api/convert", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     amount,
    //     from: swapped ? "VE" : "GEMS",
    //     to: swapped ? "GEMS" : "VE",
    //   }),
    // });

    setTimeout(() => {
      setAmount("");
      setPreview(false);
      setConverted(false);
    }, 1800);
  };

  const handleCancelConversion = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div className="exchange-wrapper">
        <div className="exchange-card">

          <h3 className="exchange-title">
            Enter {swapped ? "VE" : "Gems"} Amount
          </h3>

          <div className="exchange-row">
            <div className="exchange-box gems-box">
              <div className="gem-icon">
                💎
              </div>
              <div className="amount-content">

                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0"
                  className="amount-input"
                  aria-label={
                    swapped
                      ? "VE amount"
                      : "Gems amount"
                  }
                />

                <div className="amount-label">
                  {swapped
                    ? "VEs to convert"
                    : "Gems to convert"}
                </div>

              </div>

              {!swapped && (
                <button
                  type="button"
                  className="max-btn"
                  onClick={handleMax}
                >
                  MAX
                </button>
              )}

              {swapped && (
                <div className="input-currency">
                  VE
                </div>
              )}

            </div>

            <button
              type="button"
              className={`swap-button ${
                swapped ? "is-swapped" : ""
              }`}
              onClick={handleSwap}
              aria-label="Swap conversion"
            >
              <ArrowLeftRight
                size={25}
                strokeWidth={1.8}
              />
            </button>

            <div className="exchange-box ve-box">

              <div className="amount-content">

                <div
                  className={`amount-output ${
                    swapped
                      ? "output-purple"
                      : ""
                  }`}
                >
                  {outputAmount}
                </div>

                <div className="amount-label">
                  {swapped
                    ? "Gems you will receive"
                    : "VE(s) you will receive"}
                </div>

              </div>

              <div
                className={`ve-icon ${
                  swapped
                    ? "gem-output-icon"
                    : ""
                }`}
              >
                {swapped ? "💎" : "VE"}
              </div>

            </div>

            <button
              type="button"
              className="preview-btn"
              onClick={handlePreview}
            >
              <span>Preview Conversion</span>

              <ArrowRight
                size={22}
                strokeWidth={2}
              />
            </button>

          </div>

          <div className="exchange-rate">

            <span className="rate-icon">
              ♙
            </span>

            <span>
              1 Gem = {GEM_TO_VE} VEs
            </span>

            <Info size={16} />

          </div>

          {preview && (
            <div className="conversion-preview">

              <div className="preview-info">

                <span>
                  You are converting
                </span>

                <strong>
                  {amount}{" "}
                  {swapped ? "VEs" : "Gems"}
                </strong>

              </div>

              <ArrowRight
                size={18}
                className="preview-arrow"
              />

              <div className="preview-info">

                <span>
                  You will receive
                </span>

                <strong className="preview-ve">
                  {outputAmount}{" "}
                  {swapped ? "Gems" : "VEs"}
                </strong>

              </div>

              {/* Convert button */}
              <button
                type="button"
                className="convert-btn"
                onClick={handleConvertClick}
              >
                Convert
              </button>

            </div>
          )}


          {converted && (
            <div className="conversion-success">
              <CheckCircle size={18} />

              <span>
                Conversion completed successfully!
              </span>
            </div>
          )}

        </div>
      </div>

      {showConfirm && (
        <div
          className="confirmation-overlay"
          onClick={handleCancelConversion}
        >

          <div
            className="confirmation-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="modal-close"
              onClick={handleCancelConversion}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="confirm-icon">
              <ArrowLeftRight size={25} />
            </div>

            <h3>
              Confirm Conversion
            </h3>

            <p className="confirm-text">
              Are you sure you want to convert?
            </p>

            <div className="confirm-details">

              <div className="confirm-amount">
                <span>
                  You convert
                </span>

                <strong>
                  {amount}{" "}
                  {swapped ? "VEs" : "Gems"}
                </strong>
              </div>

              <ArrowRight size={20} />

              <div className="confirm-amount">
                <span>
                  You receive
                </span>

                <strong className="confirm-output">
                  {outputAmount}{" "}
                  {swapped ? "Gems" : "VEs"}
                </strong>
              </div>

            </div>

            {/* Rate */}
            <div className="confirm-rate">
              Rate: 1 Gem = {GEM_TO_VE} VEs
            </div>

            {/* Buttons */}
            <div className="confirmation-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancelConversion}
              >
                No
              </button>

              <button
                type="button"
                className="confirm-btn"
                onClick={handleConfirmConversion}
              >
                Yes, Convert
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
};

export default ExchangeCard;