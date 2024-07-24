import HeroSection from "../components/Hero";
import { ColumnsWithChart, ItemCarousel } from "../components";

const Home = () => {
  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>Home Page!</h1> */}
      <HeroSection />
      <ItemCarousel heading={"Found"} />
      <ItemCarousel heading={"Lost"} />
      <ColumnsWithChart />
    </div>
  );
};

export default Home;
