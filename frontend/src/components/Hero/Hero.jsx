import PropertyPreview from "../PropertyPreview/PropertyPreview";
import "./Hero.css";


function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6">
            <h1>Own a Slice of Real Estate.</h1>
    
            <p>
              Invest in premium properties using blockchain-powered
              fractional ownership. Secure, transparent and accessible
              to everyone.
            </p>

            <div className="mt-4">
              <button className="btn btn-success me-3">
                Explore Properties
              </button>

              <button className="btn btn-outline-light">
                Learn More
              </button>
            </div>
          </div>

          <div className="col-lg-6 d-flex justify-content-center">
           <PropertyPreview />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;