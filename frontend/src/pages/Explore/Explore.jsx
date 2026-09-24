import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import properties from "../../data/properties";
import "./Explore.css";

function Explore() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [category, setCategory] = useState("All");
  const [maxTokenPrice, setMaxTokenPrice] = useState(1000);
  const [minRoi, setMinRoi] = useState(0);
  const [minFunding, setMinFunding] = useState(0);

  const locations = [
    "All",
    ...new Set(properties.map((property) => property.location)),
  ];

  const categories = [
    "All",
    ...new Set(properties.map((property) => property.category)),
  ];

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch =
        property.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        property.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesLocation =
        location === "All" ||
        property.location === location;

      const matchesCategory =
        category === "All" ||
        property.category === category;

      const matchesTokenPrice =
        property.tokenPrice <= maxTokenPrice;

      const matchesRoi =
        parseFloat(property.roi) >= minRoi;

      const matchesFunding =
        property.funding >= minFunding;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory &&
        matchesTokenPrice &&
        matchesRoi &&
        matchesFunding
      );
    });
  }, [
    search,
    location,
    category,
    maxTokenPrice,
    minRoi,
    minFunding,
  ]);

  const clearFilters = () => {
    setSearch("");
    setLocation("All");
    setCategory("All");
    setMaxTokenPrice(1000);
    setMinRoi(0);
    setMinFunding(0);
  };

  return (
    <section className="explore-page">

      <div className="explore-header">
        <span className="explore-label">
          EXPLORE
        </span>

        <h1>
          Find Your
          <br />
          Next Investment
        </h1>

        <p>
          Discover tokenized real estate opportunities
          that match your investment preferences.
        </p>
      </div>

      <div className="explore-container">

        {/* FILTER PANEL */}

        <aside className="explore-filters">

          <div className="filter-heading">
            <h2>Filters</h2>

            <button
              onClick={clearFilters}
              className="clear-filters"
            >
              Clear All
            </button>
          </div>

          {/* SEARCH */}

          <div className="filter-group">
            <label>Search</label>

            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* LOCATION */}

          <div className="filter-group">
            <label>Location</label>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* CATEGORY */}

          <div className="filter-group">
            <label>Property Type</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* TOKEN PRICE */}

          <div className="filter-group">

            <div className="range-header">
              <label>Max Token Price</label>
              <strong>₹{maxTokenPrice}</strong>
            </div>

            <input
              type="range"
              min="400"
              max="1000"
              step="50"
              value={maxTokenPrice}
              onChange={(e) =>
                setMaxTokenPrice(Number(e.target.value))
              }
            />

          </div>

          {/* ROI */}

          <div className="filter-group">

            <div className="range-header">
              <label>Minimum ROI</label>
              <strong>{minRoi}%</strong>
            </div>

            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={minRoi}
              onChange={(e) =>
                setMinRoi(Number(e.target.value))
              }
            />

          </div>

          {/* FUNDING */}

          <div className="filter-group">

            <div className="range-header">
              <label>Minimum Funding</label>
              <strong>{minFunding}%</strong>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={minFunding}
              onChange={(e) =>
                setMinFunding(Number(e.target.value))
              }
            />

          </div>

        </aside>

        {/* RESULTS */}

        <main className="explore-results">

          <div className="results-header">
            <div>
              <span>PROPERTIES</span>
              <h2>
                {filteredProperties.length} Properties Found
              </h2>
            </div>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="no-results">
              <h3>No properties found</h3>

              <p>
                Try adjusting your filters to find
                more properties.
              </p>

              <button onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="explore-grid">

              {filteredProperties.map((property) => (

                <article
                  className="explore-card"
                  key={property.id}
                >

                  <div className="explore-card-image">
                    <img
                      src={property.image}
                      alt={property.title}
                    />

                    <span className="explore-category">
                      {property.category}
                    </span>
                  </div>

                  <div className="explore-card-content">

                    <div className="explore-card-location">
                      {property.location}
                    </div>

                    <h3>
                      {property.title}
                    </h3>

                    <div className="explore-card-stats">

                      <div>
                        <span>Token Price</span>
                        <strong>
                          ₹{property.tokenPrice}
                        </strong>
                      </div>

                      <div>
                        <span>ROI</span>
                        <strong>
                          {property.roi}
                        </strong>
                      </div>

                      <div>
                        <span>Funding</span>
                        <strong>
                          {property.funding}%
                        </strong>
                      </div>

                    </div>

                    <Link
                      to={`/property/${property.id}`}
                      className="explore-view-button"
                    >
                      View Property →
                    </Link>

                  </div>

                </article>

              ))}

            </div>
          )}

        </main>

      </div>

    </section>
  );
}

export default Explore;