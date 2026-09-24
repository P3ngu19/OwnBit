import { useParams, Link } from "react-router-dom";
import properties from "../../data/properties";
import "./PropertyDetails.css";

function PropertyDetails() {
  const { id } = useParams();

  const property = properties.find(
    (item) => item.id === Number(id)
  );

  if (!property) {
    return (
      <section className="property-details">
        <div className="property-not-found">
          <h1>Property Not Found</h1>
          <p>
            The property you're looking for doesn't exist.
          </p>

          <Link to="/marketplace" className="back-link">
            ← Back to Marketplace
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="property-details">

      <div className="property-details-container">

        <Link
          to="/marketplace"
          className="back-link"
        >
          ← Back to Marketplace
        </Link>

        <div className="property-details-grid">

          {/* IMAGE */}

          <div className="property-details-image">
            <img
              src={property.image}
              alt={property.title}
            />
          </div>

          {/* INFORMATION */}

          <div className="property-details-info">

            <span className="property-details-category">
              {property.category}
            </span>

            <h1>{property.title}</h1>

            <p className="property-details-location">
              📍 {property.location}
            </p>

            <div className="property-details-price">
              <span>Token Price</span>
              <strong>₹{property.tokenPrice}</strong>
              <small>per token</small>
            </div>

            <div className="property-details-stats">

              <div className="details-stat">
                <span>Total Property Value</span>
                <strong>{property.totalValue}</strong>
              </div>

              <div className="details-stat">
                <span>Expected ROI</span>
                <strong>{property.roi}</strong>
              </div>

              <div className="details-stat">
                <span>Trust Score</span>
                <strong>{property.trustScore}/100</strong>
              </div>

              <div className="details-stat">
                <span>Available Tokens</span>
                <strong>
                  {property.availableTokens.toLocaleString()}
                </strong>
              </div>

            </div>

            {/* FUNDING */}

            <div className="funding-section">

              <div className="funding-header">
                <span>Funding Progress</span>
                <strong>{property.funding}%</strong>
              </div>

              <div className="funding-bar">
                <div
                  className="funding-progress"
                  style={{
                    width: `${property.funding}%`,
                  }}
                />
              </div>

            </div>

            <button className="invest-button">
              Invest Now →
            </button>

          </div>

        </div>

        {/* DESCRIPTION */}

        <div className="property-description">

          <span className="section-label">
            ABOUT PROPERTY
          </span>

          <h2>
            {property.title}
          </h2>

          <p>
            {property.title} is a verified tokenized
            {property.category.toLowerCase()} property
            located in {property.location}. OwnBit enables
            investors to participate in fractional ownership
            by purchasing digital tokens representing a share
            of the property.
          </p>

        </div>

      </div>

    </section>
  );
}

export default PropertyDetails;