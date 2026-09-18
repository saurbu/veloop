import GemsUi from "./GemsUi";
import "../css/heading.css";

const Header = () => {
  return (
    <div className="container text-center exchange-header">
      <div className="row align-items-center">
        <div className="col-md-6 exchange-text">
          <h1 className="h1">Exchange Center</h1>

          <p className="p1">
            Turn your earned <span className="text-ppl">Gems</span> into{" "}
            <span className="text-gld">VEs</span>
          </p>

          <p className="p2">
            Convert your eligible Gems into VEs and continue your reward
            journey.
          </p>
        </div>

        <div className="col-md-6 exchange-gems">
          <GemsUi />
        </div>
      </div>
    </div>
  );
};

export default Header;