import "./WhyChoose.css";

function WhyChoose() {
  return (
    <section className="why-section">

      <div className="why-left">
        <h2>
          WHY
          <br />
          CHOOSE
          <br />
          OWNBIT?
        </h2>
      </div>

      <div className="why-right">

        <div className="why-item">
          <h3>Fractional Ownership</h3>
          <p>
            Invest in premium real estate with as little as ₹5000 through
            fractional ownership .
          </p>
        </div>

        <div className="why-item">
          <h3>Secure Payment</h3>
          <p>
            Every investment is secured by smart contracts ensuring
            transparency, immutability, and trust.
          </p>
        </div>

        <div className="why-item">
          <h3>Verified Properties</h3>
          <p>
            Every listed property undergoes legal, financial, and ownership
            verification before becoming available.
          </p>
        </div>

        <div className="why-item">
          <h3>Passive Income</h3>
          <p>
            Earn rental income and benefit from long-term appreciation while
            maintaining fractional ownership.
          </p>
        </div>

      </div>

    </section>
  );
}

export default WhyChoose;