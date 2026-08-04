import "./PropertyPreview.css";
import propertyImage from "../../assets/images/chandrayanheights.jpg";

function PropertyPreview() {
  return (
    <div className="property-card">

      <div className="property-image">
        <img src={propertyImage} alt="Chandrayan Heights" />
      </div>

      <h3>Chandrayan Heights</h3>

      <p className="price">₹85,00,000</p>

      <div className="progress mt-3">
        <div
          className="progress-bar bg-success"
          style={{ width: "82%" }}
        ></div>
      </div>

      <small className="funded-text">
        82% Funded
      </small>

      <div className="stats">

        <div className="stat">
          <span>ROI</span>
          <strong>11.8%</strong>
        </div>

        <div className="stat">
          <span>Trust</span>
          <strong className="text-success">96/100</strong>
        </div>

        <div className="stat">
          <span>Tokens</span>
          <strong>180</strong>
        </div>

      </div>

      <button className="btn btn-success w-100">
        Invest Now
      </button>

    </div>
  );
}

export default PropertyPreview;