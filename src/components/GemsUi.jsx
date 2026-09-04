import "../css/GemsUi.css";
import ves from '../assets/ves.png'
import gem from '../assets/gems.png'


function GemsUi() {
  return (
    <div className="exchange-visual">
      <div className="gem-wrapper1">
        <div className="gem-glow" />
          <img src={gem} alt="" />
        {/* <div className="gem"> */}
          {/* <div className="gem-face gem-top" /> */}
          {/* <div className="gem-face gem-left" /> */}
          {/* <div className="gem-face gem-right" /> */}
          {/* <div className="gem-face gem-bottom" /> */}
        {/* </div> */}

        <div className="gem-shadow" />
      </div>

      <div className="exchange-arrow">
        <span />
        <span />
      </div>

      <div className="coin-wrapper1">
        <div className="coin-glow" />
{/* 
        <div className="coin">
          <div className="coin-inner">
            <span>VE</span>
          </div>
        </div> */}
        <img src={ves} alt="" className="ve-img" />

        <div className="coin-shadow" />
      </div>
    </div>
  );
}

export default GemsUi