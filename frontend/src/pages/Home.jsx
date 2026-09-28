import "./Home.css";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import FeaturedProperties from "../components/FeaturedProperties/FeaturedProperties";
import About from "../pages/About/About";
import WalletConnect from "../components/WalletConnect/WalletConnect";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <WhyChoose />
      <FeaturedProperties />
      <About />
      <WalletConnect />
    </div>
  );
}

export default Home;