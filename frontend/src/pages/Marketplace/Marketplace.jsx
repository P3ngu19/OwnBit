import "./Marketplace.css";
import properties from "../../data/properties";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

function Marketplace() {
  return (
    <section className="marketplace">


      <div className="marketplace-header">

        <p className="marketplace-label">
          MARKETPLACE
        </p>

        <h1>
          Discover
          <br />
          Premium Properties
        </h1>

        <p className="marketplace-description">
          Browse verified tokenized real estate opportunities across India.
          Invest in premium residential and commercial properties with
          fractional ownership powered by blockchain.
        </p>

      </div>

      <div className="property-grid">

        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}

      </div>

    </section>
  );
}

export default Marketplace;