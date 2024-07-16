import HeroSection from "../components/Hero";
import { ColumnsWithChart, HomeStatus, ItemCarousel } from "../components";

const Home = () => {
  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>Home Page!</h1> */}
      <HeroSection />
      <ColumnsWithChart />
      <ItemCarousel heading={"Recently Found Items"} />
      <ItemCarousel heading={"Recently Lost Items"} />
      <HomeStatus />
    </div>
  );
};

export default Home;
