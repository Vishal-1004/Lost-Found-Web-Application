import { useState } from "react";

import HeroSection from "../components/Hero";
import { ColumnsWithChart, ItemCarousel, SubscribePopup } from "../components";

const Home = () => {
  const [isSubscribed, setIsSubscribed] = useState(false); // subscription status

  return (
    <div>
      <HeroSection />
      <ItemCarousel type={"found"} />
      <ItemCarousel type={"lost"} />
      <ColumnsWithChart />

      {!isSubscribed && <SubscribePopup setIsSubscribed={setIsSubscribed} />}
    </div>
  );
};

export default Home;
