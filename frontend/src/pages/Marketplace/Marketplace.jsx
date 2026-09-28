import { useEffect, useState } from "react";
import "./Marketplace.css";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

function Marketplace() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/properties"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();

        const formattedProperties = data.properties.map((property) => ({
          id: property.id,
          title: property.title,
          location: property.location,
          category: property.category,
          image: property.image,
          totalValue: property.total_value,
          tokenPrice: Number(property.token_price),
          roi: `${property.roi}%`,
          funding: Number(property.funding),
          trustScore: Number(property.trust_score),
          availableTokens: Number(property.available_tokens),
        }));

        setProperties(formattedProperties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Unable to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

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

      {loading && <p>Loading properties...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Marketplace;