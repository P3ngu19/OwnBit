import "./Home.css";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import FeaturedProperties from "../components/FeaturedProperties/FeaturedProperties";
import About from "../pages/About/About";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <WhyChoose />
      <FeaturedProperties />
      <About />
    </div>
  );
}

export default Home;