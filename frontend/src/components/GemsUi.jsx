import "../css/GemsUi.css";
import ves from "../assets/ves.png";
import gem from "../assets/gems.png";

function GemsUi() {
  return (
    <div className="exchange-visual">
      <div className="gem-wrapper1">
        <div className="gem-glow" />
        <img src={gem} alt="Gems" className="gem-img" />
        <div className="gem-shadow" />
      </div>

      <div className="exchange-arrow">
        <span className="arrow-line" />
        <span className="arrow-head" />
      </div>

      <div className="coin-wrapper1">
        <div className="coin-glow" />
        <img src={ves} alt="VEs" className="ve-img" />
      </div>
    </div>
  );
}

export default GemsUi;