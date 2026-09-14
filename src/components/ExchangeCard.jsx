import { useState } from "react";
import {
  ArrowRight,
  ArrowLeftRight,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "../css/ExchangeCard.css";



const ExchangeCard = ({availableGems = 0}) => {
  const [amount, setAmount] = useState("");
  const [swapped, setSwapped] = useState(false);
  const [preview, setPreview] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [converted, setConverted] = useState(false);

  const numericAmount = Number(amount);
  const GEM_TO_VE = 5.39;
  const MAX_GEMS = availableGems;
  const MIN_GEMS = 20;
  const outputAmount =
    amount !== "" && !isNaN(numericAmount) && numericAmount > 0
      ? swapped
        ? (numericAmount / GEM_TO_VE).toFixed(2)
        : (numericAmount * GEM_TO_VE).toFixed(2)
      : "0";

  const isEmpty = amount === "" || isNaN(numericAmount) || numericAmount <= 0;
  const isBelowMinimum =
    !swapped && numericAmount > 0 && numericAmount < MIN_GEMS;
  const canConvert = !swapped
    ? numericAmount >= MIN_GEMS
    : numericAmount >= MIN_GEMS * GEM_TO_VE;

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
    if (isEmpty) {
      return;
    }

    setPreview(true);
    setConverted(false);
  };

  const handleConvertClick = () => {
    if (!canConvert) {
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirmConversion = () => {
    if (!canConvert) {
      return;
    }

    setShowConfirm(false);
    setConverted(true);

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
          <div className="exchange-heading">
            <div>
              <span className="exchange-eyebrow">EXCHANGE CENTER</span>
              <h3 className="exchange-title">
                Convert your {swapped ? "VEs" : "Gems"}
              </h3>
            </div>

            <div className="exchange-status">
              <span></span>
              Live Rate | 
              <div className="exchange-rate">
              1 Gem = {GEM_TO_VE} VEs
            </div>
            </div>
          </div>

          <div className="exchange-row">
            <div className="exchange-box gems-box">
              <div className="exchange-box-top">
                <span className="box-label">
                  {swapped ? "VEs" : "Gems"}
                </span>

                <span className="box-type">
                  {swapped ? "SOURCE" : "SOURCE"}
                </span>
              </div>

              <div className="exchange-input-row">
                <div className={`gem-icon ${swapped ? "ve-source-icon" : ""}`}>
                  {swapped ? <span className="ve-coin">VE</span> : "💎"}
                </div>

                <div className="amount-content">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="0"
                    className="amount-input"
                    aria-label={swapped ? "VE amount" : "Gems amount"}
                  />

                  <div className="amount-label">
                    {swapped ? "VEs to convert" : "Gems to convert"}
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
                  <span className="input-currency">
                    VE
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              className={`swap-button ${swapped ? "is-swapped" : ""}`}
              onClick={handleSwap}
              aria-label="Swap conversion"
            >
              <ArrowLeftRight
                size={22}
                strokeWidth={1.8}
              />
            </button>

            <div className="exchange-box ve-box">
              <div className="exchange-box-top">
                <span className="box-label">
                  {swapped ? "Gems" : "VEs"}
                </span>

                <span className="box-type">
                  RECEIVE
                </span>
              </div>

              <div className="exchange-input-row">
                <div className="amount-content">
                  <div
                    className={`amount-output ${
                      swapped ? "output-purple" : ""
                    }`}
                  >
                    {outputAmount}
                  </div>

                  <div className="amount-label">
                    {swapped
                      ? "Gems you will receive"
                      : "VEs you will receive"}
                  </div>
                </div>

                <div className={`ve-icon ${swapped ? "gem-output-icon" : ""}`}>
                  {swapped ? "💎" : <span className="ve-coin">VE</span>}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="preview-btn"
              onClick={handlePreview}
            >
              <span>Preview Conversion</span>
              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>

          {/* <div className="exchange-footer">
            

            <div className="minimum-rate">
              Minimum conversion: {MIN_GEMS} Gems
            </div>
          </div> */}

          {preview && (
            <div className="conversion-preview">
              <div className="preview-header">
                <span>Conversion Preview</span>
                {isBelowMinimum && (
                  <span className="preview-warning-label">
                    Below minimum
                  </span>
                )}
              </div>

              <div className="preview-main">
                <div className="preview-info">
                  <span>You are converting</span>
                  <strong>
                    {amount} {swapped ? "VEs" : "Gems"}
                  </strong>
                </div>

                <div className="preview-arrow-wrap">
                  <ArrowRight
                    size={17}
                    className="preview-arrow"
                  />
                </div>

                <div className="preview-info">
                  <span>You will receive</span>
                  <strong className="preview-ve">
                    {outputAmount} {swapped ? "Gems" : "VEs"}
                  </strong>
                </div>
              </div>

              {isBelowMinimum && (
                <div className="minimum-warning">
                  <AlertCircle size={15} />
                  <span>
                    Minimum conversion is {MIN_GEMS} Gems
                  </span>
                </div>
              )}

              <button
                type="button"
                className={`convert-btn ${
                  !canConvert ? "convert-btn-disabled" : ""
                }`}
                disabled={!canConvert}
                onClick={handleConvertClick}
              >
                {isBelowMinimum
                  ? `Minimum ${MIN_GEMS} Gems`
                  : "Convert"}
              </button>
            </div>
          )}

          {converted && (
            <div className="conversion-success">
              <CheckCircle size={17} />
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
              <X size={19} />
            </button>

            <div className="confirm-icon">
              <ArrowLeftRight size={24} />
            </div>

            <h3>Confirm Conversion</h3>

            <p className="confirm-text">
              Review your conversion before continuing.
            </p>

            <div className="confirm-details">
              <div className="confirm-amount">
                <span>You convert</span>
                <strong>
                  {amount} {swapped ? "VEs" : "Gems"}
                </strong>
              </div>

              <ArrowRight size={19} />

              <div className="confirm-amount">
                <span>You receive</span>
                <strong className="confirm-output">
                  {outputAmount} {swapped ? "Gems" : "VEs"}
                </strong>
              </div>
            </div>

            <div className="confirm-rate">
              Rate: 1 Gem = {GEM_TO_VE} VEs
            </div>

            <div className="confirmation-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancelConversion}
              >
                Cancel
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