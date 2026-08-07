import { useEffect, useState } from "react";
import "./Hero.css";
import Navbar from "../Navbar/Navbar";

function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="hero">

      <div className="hero-sticky">
        <Navbar />
        <div
          className="hero-content"
          style={{
            opacity: Math.max(1 - scrollY / 500, 0),
            transform: `translate(-50%, calc(-50% - ${scrollY * 0.25}px))`,
          }}
        >
          <h1 className="hero-title">
            OwnBit
          </h1>
          <h2 className="hero-subtitle">
            Invest in Real Estate with Ease
          </h2>
        </div>

      </div>

    </section>
  );
}

export default Hero;