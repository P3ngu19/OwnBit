import "./PropertyCard.css";
import { useNavigate } from "react-router-dom";

function PropertyCard({ property }) {
  const navigate = useNavigate();
  return (
    <article className="property-card">
      <div className="property-image">
        <img src={property.image} alt={property.title} />

        <div className="image-overlay">
          <div className="overlay-stats">
            <div>
              <small>ROI</small>
              <strong>{property.roi}</strong>
            </div>

            <div>
              <small>Trust</small>
              <strong>{property.trustScore}</strong>
            </div>

            <div>
              <small>Tokens</small>
              <strong>{property.availableTokens}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="property-content">
        <span className="category">{property.category}</span>

        <h2>{property.title}</h2>

        <p className="location">{property.location}</p>

        <div className="bottom-row">
          <div className="price">
            ₹{property.tokenPrice}
            <span> / Token</span>
          </div>

          <button
            className="view-btn"
            onClick={() => navigate(`/property/${property.id}`)}
          >
            View
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;
