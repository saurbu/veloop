import { useState } from "react";
import {
  ArrowRight,
  ArrowLeftRight,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "../css/ExchangeCard.css";

const API_URL = "https://veloop-a2i3.onrender.com";

const ExchangeCard = ({
  availableGems = 0,
  availableVEs = 0,
  onConversionComplete,
}) => {
  const [amount, setAmount] = useState("");
  const [swapped, setSwapped] = useState(false);
  const [preview, setPreview] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [converted, setConverted] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const GEM_TO_VE = 5.39;
  const MIN_GEMS = 20;

  const maxAmount = swapped
    ? availableVEs
    : availableGems;

  const numericAmount = Number(amount);

  const outputAmount =
    amount !== "" &&
    !isNaN(numericAmount) &&
    numericAmount > 0
      ? swapped
        ? (numericAmount / GEM_TO_VE).toFixed(2)
        : (numericAmount * GEM_TO_VE).toFixed(2)
      : "0";

  const isEmpty =
    amount === "" ||
    isNaN(numericAmount) ||
    numericAmount <= 0;

  const isBelowMinimum =
    !swapped &&
    numericAmount > 0 &&
    numericAmount < MIN_GEMS;

  const requiredVE = MIN_GEMS * GEM_TO_VE;

  const insufficientBalance = swapped
    ? numericAmount > availableVEs
    : numericAmount > availableGems;

  const canConvert =
    !isEmpty &&
    !isBelowMinimum &&
    !insufficientBalance &&
    (swapped
      ? numericAmount >= requiredVE
      : numericAmount >= MIN_GEMS);

  const handleAmountChange = (e) => {
    const value = e.target.value;

    setErrorMessage("");
    setConverted(false);

    if (value === "") {
      setAmount("");
      setPreview(false);
      return;
    }

    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setPreview(false);
    }
  };

  const handleMax = () => {
    setAmount(maxAmount.toString());
    setPreview(false);
    setConverted(false);
    setErrorMessage("");
  };

  const handleSwap = () => {
    setErrorMessage("");
    setConverted(false);

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
  };

  const handlePreview = () => {
    setErrorMessage("");
    setConverted(false);

    if (isEmpty) {
      return;
    }

    setPreview(true);
  };

  const handleConvertClick = () => {
    setErrorMessage("");

    if (!canConvert || processing) {
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirmConversion = async () => {
    if (!canConvert || processing) {
      return;
    }

    try {
      setProcessing(true);
      setErrorMessage("");

      let response;

      if (swapped) {
        response = await fetch(
          `${API_URL}/api/conversion/ves-to-gems`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ves: numericAmount,
            }),
          }
        );
      } else {
        response = await fetch(
          `${API_URL}/api/conversion/gems-to-ves`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              gems: numericAmount,
            }),
          }
        );
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(
          data.message || "Conversion failed"
        );
        return;
      }

      if (onConversionComplete) {
        await onConversionComplete(data.balance)
      }

      setShowConfirm(false);
      setConverted(true);
      setErrorMessage("");

      setTimeout(() => {
        setAmount("");
        setPreview(false);
        setConverted(false);
      }, 1800);
    } catch (error) {
      console.error("Conversion failed:", error);
      setErrorMessage(
        "Unable to connect to the conversion server"
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleCancelConversion = () => {
    if (processing) {
      return;
    }

    setShowConfirm(false);
    setErrorMessage("");
  };

  return (
    <>
      <div className="exchange-wrapper">
        <div className="exchange-card">
          <div className="exchange-heading">
            <div>
              <span className="exchange-eyebrow">
                EXCHANGE CENTER
              </span>

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
                  SOURCE
                </span>
              </div>

              <div className="exchange-input-row">
                <div
                  className={`gem-icon ${
                    swapped ? "ve-source-icon" : ""
                  }`}
                >
                  {swapped ? (
                    <span className="ve-coin">VE</span>
                  ) : (
                    "💎"
                  )}
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
                    disabled={processing}
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
                    disabled={processing}
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
              className={`swap-button ${
                swapped ? "is-swapped" : ""
              }`}
              onClick={handleSwap}
              aria-label="Swap conversion"
              disabled={processing}
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

                <div
                  className={`ve-icon ${
                    swapped
                      ? "gem-output-icon"
                      : ""
                  }`}
                >
                  {swapped ? (
                    "💎"
                  ) : (
                    <span className="ve-coin">
                      VE
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="preview-btn"
              onClick={handlePreview}
              disabled={processing}
            >
              <span>Preview Conversion</span>
              <ArrowRight
                size={18}
                strokeWidth={2}
              />
            </button>
          </div>

          {preview && (
            <div className="conversion-preview">
              <div className="preview-header">
                <span>
                  Conversion Preview
                </span>

                {isBelowMinimum && (
                  <span className="preview-warning-label">
                    Below minimum
                  </span>
                )}

                {!isBelowMinimum &&
                  insufficientBalance && (
                    <span className="preview-warning-label">
                      Insufficient balance
                    </span>
                  )}
              </div>

              <div className="preview-main">
                <div className="preview-info">
                  <span>
                    You are converting
                  </span>

                  <strong>
                    {amount}{" "}
                    {swapped ? "VEs" : "Gems"}
                  </strong>
                </div>

                <div className="preview-arrow-wrap">
                  <ArrowRight
                    size={17}
                    className="preview-arrow"
                  />
                </div>

                <div className="preview-info">
                  <span>
                    You will receive
                  </span>

                  <strong className="preview-ve">
                    {outputAmount}{" "}
                    {swapped ? "Gems" : "VEs"}
                  </strong>
                </div>
              </div>

              {isBelowMinimum && (
                <div className="minimum-warning">
                  <AlertCircle size={15} />

                  <span>
                    Minimum conversion is{" "}
                    {MIN_GEMS} Gems
                  </span>
                </div>
              )}

              {!isBelowMinimum &&
                insufficientBalance && (
                  <div className="minimum-warning">
                    <AlertCircle size={15} />

                    <span>
                      Insufficient{" "}
                      {swapped ? "VEs" : "Gems"} balance
                    </span>
                  </div>
                )}

              {errorMessage && (
                <div className="minimum-warning">
                  <AlertCircle size={15} />

                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="button"
                className={`convert-btn ${
                  !canConvert || processing
                    ? "convert-btn-disabled"
                    : ""
                }`}
                disabled={!canConvert || processing}
                onClick={handleConvertClick}
              >
                {processing
                  ? "Processing..."
                  : isBelowMinimum
                  ? `Minimum ${MIN_GEMS} Gems`
                  : insufficientBalance
                  ? "Insufficient Balance"
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
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              type="button"
              className="modal-close"
              onClick={handleCancelConversion}
              aria-label="Close"
              disabled={processing}
            >
              <X size={19} />
            </button>

            <div className="confirm-icon">
              <ArrowLeftRight size={24} />
            </div>

            <h3>
              Confirm Conversion
            </h3>

            <p className="confirm-text">
              Review your conversion before
              continuing.
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

              <ArrowRight size={19} />

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

            <div className="confirm-rate">
              Rate: 1 Gem = {GEM_TO_VE} VEs
            </div>

            {errorMessage && (
              <div className="minimum-warning">
                <AlertCircle size={15} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="confirmation-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancelConversion}
                disabled={processing}
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm-btn"
                onClick={handleConfirmConversion}
                disabled={processing}
              >
                {processing
                  ? "Processing..."
                  : "Yes, Convert"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExchangeCard;
