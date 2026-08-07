import "./About.css";

function About() {
  return (
    <section className="about-page">

      <div className="about-container">

        <p className="about-label">
          ABOUT OWNBIT
        </p>

        <h1>
          Revolutionizing Real Estate
          <br />
          Through Blockchain.
        </h1>

        <p className="about-description">
          OwnBit is a blockchain-powered real estate investment platform that
          enables fractional ownership of premium properties. Our mission is to
          make real estate investing accessible, transparent, and secure by
          allowing investors to purchase digital property tokens instead of an
          entire property.
        </p>

        <div className="about-grid">

          <div className="about-card">
            <h3>Our Vision</h3>
            <p>
              Democratize real estate investing by removing financial barriers
              and enabling anyone to invest in premium properties.
            </p>
          </div>

          <div className="about-card">
            <h3>Our Mission</h3>
            <p>
              To create a transparent,
              trustworthy, and efficient real estate investment ecosystem.
            </p>
          </div>

          <div className="about-card">
            <h3>Why OwnBit?</h3>
            <p>
              Secure smart contracts, verified properties, passive income, and
              complete ownership transparency through tokenization.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default About;