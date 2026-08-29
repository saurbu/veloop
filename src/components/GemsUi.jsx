import "../css/GemsUi.css";

function GemsUi() {
  return (
    <div className="exchange-visual">
      <div className="gem-wrapper">
        <div className="gem-glow" />

        <div className="gem">
          <div className="gem-face gem-top" />
          <div className="gem-face gem-left" />
          <div className="gem-face gem-right" />
          <div className="gem-face gem-bottom" />
        </div>

        <div className="gem-shadow" />
      </div>

      <div className="exchange-arrow">
        <span />
        <span />
      </div>

      <div className="coin-wrapper">
        <div className="coin-glow" />

        <div className="coin">
          <div className="coin-inner">
            <span>VE</span>
          </div>
        </div>

        <div className="coin-shadow" />
      </div>
    </div>
  );
}

export default GemsUi