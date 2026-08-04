import Navbar from "../../components/Navbar/Navbar";
import "./Marketplace.css";

function Marketplace() {
  return (
    <div className="marketplace-page">
      <Navbar />

      <section className="marketplace-hero">
        <div className="container">
          <span className="marketplace-label">Marketplace</span>
          <h1>Explore tokenized real estate opportunities.</h1>
          <p>
            Browse premium properties, compare investment options, and get
            ready for the next step of the OwnBit experience.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Marketplace;
