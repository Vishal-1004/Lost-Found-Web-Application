import HeroSection from "../components/Hero";
import { ColumnsWithChart, ItemCarousel, SubscribePopup } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const userToken = useSelector((state) => state.storedUserData.userToken);
  const notifications = useSelector(
    (state) => state.storedUserData.userData.notifications
  );
  const notificationCount = useSelector(
    (state) => state.storedUserData.notificationPopupCount
  );

  return (
    <div>
      <HeroSection />
      <ItemCarousel type={"found"} />
      <ItemCarousel type={"lost"} />
      <ColumnsWithChart />

      {/* If you have loggedin and you have already subscribed then you will not get the Subscribe popup but if you have loggedin and  you have not subscribed then we show you the popup for one time*/}
      {userToken &&
        (!notifications && notificationCount < 2 ? (
          <SubscribePopup setIsSubscribed={null} />
        ) : null)}
    </div>
  );
};

export default Home;
