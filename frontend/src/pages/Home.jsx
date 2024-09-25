import { useState } from "react";

import HeroSection from "../components/Hero";
import { ColumnsWithChart, ItemCarousel, SubscribePopup } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const userToken = useSelector((state) => state.storedUserData.userToken);
  const notifications = useSelector(
    (state) => state.storedUserData.userData.notifications
  );

  //const [isSubscribed, setIsSubscribed] = useState(false); // subscription status

  return (
    <div>
      <HeroSection />
      <ItemCarousel type={"found"} />
      <ItemCarousel type={"lost"} />
      <ColumnsWithChart />

      {!notifications && userToken && <SubscribePopup setIsSubscribed={null} />}
    </div>
  );
};

export default Home;
