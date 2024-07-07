import HeroSection from "../components/Hero";
import { FoundCarousel } from "../components";

const Home = () => {
  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>Home Page!</h1> */}
      <HeroSection/>
      <FoundCarousel heading={"Recently Found Items"}/>
      <FoundCarousel heading={"Recently Lost Items"}/>
    </div>
  );
};

export default Home;
