import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PropertyDetails.css";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/properties/${id}`
        );

        if (!response.ok) {
          throw new Error("Property not found");
        }

        const data = await response.json();

        const formattedProperty = {
          id: data.property.id,
          title: data.property.title,
          location: data.property.location,
          category: data.property.category,
          image: data.property.image,
          totalValue: data.property.total_value,
          tokenPrice: Number(data.property.token_price),
          roi: `${data.property.roi}%`,
          funding: Number(data.property.funding),
          trustScore: Number(data.property.trust_score),
          availableTokens: Number(data.property.available_tokens),
        };

        setProperty(formattedProperty);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Property not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleInvest = async () => {
    const sessionData = sessionStorage.getItem("ownbit_session");

    if (!sessionData) {
      alert("Please login to invest.");
      return;
    }

    let session;

    try {
      session = JSON.parse(sessionData);
    } catch (error) {
      console.error("Session parsing error:", error);
      alert("Please login again.");
      return;
    }

    if (!session?.token) {
      alert("Please login to invest.");
      return;
    }

    const tokens = window.prompt(
      `Enter number of tokens to invest:\n\nToken price: ₹${property.tokenPrice}`
    );

    if (tokens === null) {
      return;
    }

    const tokenQuantity = Number(tokens);

    if (
      !Number.isInteger(tokenQuantity) ||
      tokenQuantity <= 0
    ) {
      alert("Please enter a valid whole number of tokens.");
      return;
    }

    if (tokenQuantity > property.availableTokens) {
      alert(
        `Only ${property.availableTokens.toLocaleString()} tokens are available.`
      );
      return;
    }

    const totalAmount =
      tokenQuantity * property.tokenPrice;

    const confirmed = window.confirm(
      `Confirm Investment\n\n` +
        `Property: ${property.title}\n` +
        `Tokens: ${tokenQuantity}\n` +
        `Token Price: ₹${property.tokenPrice}\n` +
        `Total Investment: ₹${totalAmount.toLocaleString()}`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/investments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.token}`,
          },
          body: JSON.stringify({
            property_id: property.id,
            tokens: tokenQuantity,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Investment failed.");
        return;
      }

      alert(
        `Investment successful!\n\n` +
          `Tokens: ${tokenQuantity}\n` +
          `Amount: ₹${Number(
            data.investment.amount
          ).toLocaleString()}`
      );

      window.location.reload();
    } catch (error) {
      console.error("Investment error:", error);
      alert("Unable to process investment.");
    }
  };

  if (loading) {
    return (
      <section className="property-details">
        <div className="property-not-found">
          <h1>Loading Property...</h1>
        </div>
      </section>
    );
  }

  if (error || !property) {
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

            <button
              className="invest-button"
              onClick={handleInvest}
            >
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