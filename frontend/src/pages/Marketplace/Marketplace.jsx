import { useMemo, useState } from "react";
import "./Marketplace.css";
import properties from "../../data/properties";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

function Marketplace() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");

  const visibleProperties = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return properties
      .filter((property) => {
        const matchesCategory =
          category === "All" || property.category === category;
        const searchableText = [
          property.title,
          property.location,
          property.category,
        ]
          .join(" ")
          .toLowerCase();

        return (
          matchesCategory &&
          (!normalizedQuery || searchableText.includes(normalizedQuery))
        );
      })
      .sort((first, second) => {
        if (sortBy === "roi") {
          return parseFloat(second.roi) - parseFloat(first.roi);
        }

        if (sortBy === "price-low") {
          return first.tokenPrice - second.tokenPrice;
        }

        if (sortBy === "price-high") {
          return second.tokenPrice - first.tokenPrice;
        }

        return second.trustScore - first.trustScore;
      });
  }, [category, query, sortBy]);

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

        <div className="marketplace-controls" aria-label="Property filters">
          <label className="property-search">
            <span className="sr-only">Search properties</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by property, city, or type"
            />
          </label>

          <div className="filter-row">
            <div className="filter-chips" aria-label="Property category">
              {["All", "Residential", "Commercial"].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={category === option ? "is-active" : ""}
                  onClick={() => setCategory(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <label className="property-sort">
              <span>Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="roi">Highest ROI</option>
                <option value="price-low">Token price: low to high</option>
                <option value="price-high">Token price: high to low</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="marketplace-results">
        <p aria-live="polite">
          {visibleProperties.length} {visibleProperties.length === 1 ? "property" : "properties"} available
        </p>

        {visibleProperties.length > 0 ? (
          <div className="property-grid">
            {visibleProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="empty-properties" role="status">
            <h2>No properties match those filters.</h2>
            <p>Try a different search term or choose another category.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
  );
}

export default Marketplace;
