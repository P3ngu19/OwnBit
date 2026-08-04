import "./Home.css";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";

function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
    </div>
  );
}

export default Home;