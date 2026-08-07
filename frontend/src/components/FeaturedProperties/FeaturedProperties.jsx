import "./FeaturedProperties.css";
import PropertyCard from "../PropertyCard/PropertyCard";
import properties from "../../data/properties";
import { Link } from "react-router-dom";

function FeaturedProperties() {
  return (
    <section className="featured-section">

      <div className="featured-header">

        <div>
          <p className="featured-label">
            FEATURED PROPERTIES
          </p>

          <h2>
            Invest in Premium Real Estate
          </h2>
        </div>

        <Link to="/marketplace" className="view-all">
          View Marketplace →
        </Link>

      </div>

      <div className="featured-grid">

        {properties.slice(0, 3).map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}

      </div>

    </section>
  );
}

export default FeaturedProperties;