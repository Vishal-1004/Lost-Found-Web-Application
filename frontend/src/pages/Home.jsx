import HeroSection from "../components/Hero";
import {  ColumnsWithChart, ItemCarousel } from "../components";

const Home = () => {
  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>Home Page!</h1> */}
      <HeroSection />
      <ColumnsWithChart/>
      <ItemCarousel heading={"Recently Found Items"} />
      <ItemCarousel heading={"Recently Lost Items"} />
      <div>
        <h1>Stats</h1>
        <div className="flex">
        </div>
      </div>
    </div>
  );
};

export default Home;
