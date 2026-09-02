import { useState } from "react";
import { ArrowRight, ArrowLeftRight, Info } from "lucide-react";
import "../css/ExchangeCard.css";

const GEM_TO_VE = 5.39;

const ExchangeCard = () => {
  const [gems, setGems] = useState("");
  const [preview, setPreview] = useState(false);
  const [swapped, setSwapped] = useState(false);

  // Calculate VE
  const veAmount =
    gems !== "" && !isNaN(Number(gems))
      ? (Number(gems) * GEM_TO_VE).toFixed(2)
      : "0";

  // Handle input
  const handleGemsChange = (e) => {
    const value = e.target.value;

    // Allow empty
    if (value === "") {
      setGems("");
      setPreview(false);
      return;
    }

    // Allow only numbers and decimals
    if (/^\d*\.?\d*$/.test(value)) {
      setGems(value);
      setPreview(false);
    }
  };

  // MAX button
  const handleMax = () => {
    // Change this according to the user's actual available gems
    const maxGems = 1000;

    setGems(maxGems.toString());
    setPreview(false);
  };

  // Preview
  const handlePreview = () => {
    if (!gems || Number(gems) <= 0) {
      alert("Please enter a valid Gems amount.");
      return;
    }

    setPreview(true);
  };

  // Swap
  const handleSwap = () => {
    setSwapped((prev) => !prev);
  };

  return (
    <div className="exchange-wrapper">
      <div className="exchange-card">

        {/* Heading */}
        <h3 className="exchange-title">
          Enter Gems Amount
        </h3>

        {/* Exchange row */}
        <div className="exchange-row">

          {/* LEFT SIDE */}
          <div className="exchange-box gems-box">

            <div className="gem-icon">
              💎
            </div>

            <div className="amount-content">

              <input
                type="text"
                inputMode="decimal"
                value={
                  swapped && veAmount !== "0"
                    ? veAmount
                    : gems
                }
                onChange={handleGemsChange}
                placeholder="0"
                className="amount-input"
                aria-label="Gems amount"
                disabled={swapped}
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

          </div>

          {/* SWAP */}
          <button
            type="button"
            className="swap-button"
            onClick={handleSwap}
            aria-label="Swap conversion"
          >
            <ArrowLeftRight
              size={25}
              strokeWidth={1.8}
            />
          </button>

          {/* RIGHT SIDE */}
          <div className="exchange-box ve-box">

            <div className="amount-content">

              <div
                className={`amount-output ${
                  swapped ? "output-purple" : ""
                }`}
              >
                {swapped
                  ? gems || "0"
                  : veAmount}
              </div>

              <div className="amount-label">
                {swapped
                  ? "Gems you will receive"
                  : "VE(s) you will receive"}
              </div>

            </div>

            <div className="ve-icon">
              {swapped ? "💎" : "VE"}
            </div>

          </div>

          {/* PREVIEW BUTTON */}
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

        {/* Conversion rate */}
        <div className="exchange-rate">

          <span className="rate-icon">
            ♙
          </span>

          <span>
            1 Gem = {GEM_TO_VE} VEs
          </span>

          <Info size={16} />

        </div>

        {/* Preview Result */}
        {preview && (
          <div className="conversion-preview">

            <div>
              <span>Conversion</span>

              <strong>
                {gems} Gems
              </strong>
            </div>

            <ArrowRight size={18} />

            <div>
              <span>You receive</span>

              <strong className="preview-ve">
                {veAmount} VEs
              </strong>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ExchangeCard;