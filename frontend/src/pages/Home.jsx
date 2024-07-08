import HeroSection from "../components/Hero";
import { ItemCarousel } from "../components";

const Home = () => {
  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>Home Page!</h1> */}
      <HeroSection />
      <ItemCarousel heading={"Recently Found Items"} />
      <ItemCarousel heading={"Recently Lost Items"} />
    </div>
  );
};

export default Home;
