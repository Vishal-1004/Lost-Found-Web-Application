import HeroSection from "../components/Hero";
import { CustomChart, ItemCarousel } from "../components";

const Home = () => {
  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>Home Page!</h1> */}
      <HeroSection />
      <ItemCarousel heading={"Recently Found Items"} />
      <ItemCarousel heading={"Recently Lost Items"} />
      <div>
        <h1>Stats</h1>
        <div className="flex">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            porro nihil laudantium assumenda, quod, doloremque, praesentium quas
            perspiciatis reprehenderit repellat iusto repellendus vero eligendi
            molestiae!
          </p>
          <CustomChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
