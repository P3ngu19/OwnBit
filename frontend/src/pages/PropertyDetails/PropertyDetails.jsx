import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "./PropertyDetails.css";

import { getSession } from "../../services/authService";
import { issueOwnBitTokens } from "../../services/walletService";

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
    try {
      const session = getSession();

      if (!session?.token) {
        alert("Please login before investing.");
        return;
      }

      if (!window.ethereum) {
        alert("MetaMask is not installed.");
        return;
      }

      const quantity = prompt(
        `Enter number of tokens to invest in ${property.title}:`
      );

      if (quantity === null) {
        return;
      }

      const tokens = Number(quantity);

      if (!Number.isInteger(tokens) || tokens <= 0) {
        alert("Please enter a valid positive whole number of tokens.");
        return;
      }

      if (tokens > property.availableTokens) {
        alert(
          `Only ${property.availableTokens.toLocaleString()} tokens are available.`
        );
        return;
      }

      const totalAmount = tokens * property.tokenPrice;

      const confirmed = window.confirm(
        `Invest in ${property.title}?\n\n` +
          `Tokens: ${tokens}\n` +
          `Amount: ₹${totalAmount.toLocaleString("en-IN")}\n\n` +
          `A blockchain transaction will be required.`
      );

      if (!confirmed) {
        return;
      }

      alert(
        "Please confirm the blockchain transaction in MetaMask."
      );

      // --------------------------------------------------
      // STEP 1: BLOCKCHAIN TRANSACTION
      // --------------------------------------------------

      const blockchainResult = await issueOwnBitTokens(tokens);

      console.log(
        "Blockchain transaction confirmed:",
        blockchainResult.hash
      );

      // --------------------------------------------------
      // STEP 2: RECORD INVESTMENT IN POSTGRESQL
      // --------------------------------------------------

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
            tokens,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to record investment."
        );
      }

      // --------------------------------------------------
      // SUCCESS
      // --------------------------------------------------

      alert(
        `Investment successful!\n\n` +
          `Property: ${property.title}\n` +
          `Tokens: ${tokens}\n` +
          `Amount: ₹${totalAmount.toLocaleString("en-IN")}\n\n` +
          `Blockchain Transaction:\n${blockchainResult.hash}`
      );

      window.location.reload();
    } catch (error) {
      console.error("Investment error:", error);

      if (
        error.code === 4001 ||
        error.code === "ACTION_REJECTED"
      ) {
        alert("Blockchain transaction was rejected in MetaMask.");
        return;
      }

      if (
        error.code === "INSUFFICIENT_FUNDS"
      ) {
        alert("Insufficient ETH for the blockchain transaction.");
        return;
      }

      alert(
        error.message ||
          "Investment failed. Please try again."
      );
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

          <Link
            to="/marketplace"
            className="back-link"
          >
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

              <strong>
                ₹{property.tokenPrice.toLocaleString("en-IN")}
              </strong>

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
                <strong>
                  {property.trustScore}/100
                </strong>
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

                <strong>
                  {property.funding}%
                </strong>
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
            {property.title} is a verified tokenized{" "}
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