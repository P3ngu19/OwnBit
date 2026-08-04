import "./PropertyPreview.css";

function PropertyPreview() {
  return (
    <div className="property-card">

      <div className="property-image">
        🏢
      </div>

      <h3>Sky Heights Apartment</h3>

      <p className="price">₹85,00,000</p>

      <div className="progress-section">
        <div className="progress">
          <div
            className="progress-bar bg-success"
            style={{ width: "82%" }}
          ></div>
        </div>

        <small>82% Funded</small>
      </div>

      <div className="stats">

        <div>
          <span>ROI</span>
          <strong>11.8%</strong>
        </div>

        <div>
          <span>Trust Score</span>
          <strong className="text-success">96/100</strong>
        </div>

      </div>

      <button className="btn btn-success w-100 mt-4">
        Invest Now
      </button>

    </div>
  );
}

export default PropertyPreview;