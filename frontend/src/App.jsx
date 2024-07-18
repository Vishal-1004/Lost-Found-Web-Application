import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Home,
  LoginPage,
  ResetPassword,
  SignUp,
  VerifyEmail,
  VerifyOTP,
  Profile,
  AllUsers,
  AboutUs,
  Found,
  Lost,
  ContactUs
} from "./pages";
import { BackToTop, Footer, Navbar } from "./components";
import EditProfile from "./pages/EditProfile";
import { useEffect } from "react";
import { verifyTokenFunction } from "./services/API";
import { ToastMsg } from "./constants";

// checking
const App = () => {
  const userToken = useSelector((state) => state.storedUserData.userToken);
  const userStatus = useSelector((state) => state.storedUserData.userStatus);

  const emailVerified = useSelector(
    (state) => state.resetPasswordState.emailVerified
  );
  const otpVerified = useSelector(
    (state) => state.resetPasswordState.otpVerified
  );

  // to logout user when the userToken expires
  useEffect(() => {
    const checkToken = async () => {
      if (userToken) {
        try {
          const response = await verifyTokenFunction(userToken);
          //console.log(response);

          if (response.data.message === "Token has expired") {
            localStorage.clear();
            ToastMsg("Session expired! Logging out.", "error");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        } catch (error) {
          console.error("Token verification error:", error);
          localStorage.clear(); // Clear storage if there's an error
          window.location.reload();
        }
      }
    };

    checkToken();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/edit-profile"
          element={
            userToken ? (
              <EditProfile />
            ) : emailVerified && !otpVerified ? (
              <VerifyOTP />
            ) : emailVerified && otpVerified ? (
              <ResetPassword />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/registered-users"
          element={userToken && userStatus == "ADMIN" ? <AllUsers /> : <Home />}
        />
        <Route
          path="/login"
          element={
            userToken ? (
              <Home />
            ) : emailVerified && !otpVerified ? (
              <VerifyOTP />
            ) : emailVerified && otpVerified ? (
              <ResetPassword />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/sign-up"
          element={
            userToken ? (
              <Home />
            ) : emailVerified && !otpVerified ? (
              <VerifyOTP />
            ) : emailVerified && otpVerified ? (
              <ResetPassword />
            ) : (
              <SignUp />
            )
          }
        />
        <Route
          path="/forgot-password"
          element={
            userToken ? (
              <Home />
            ) : emailVerified && !otpVerified ? (
              <VerifyOTP />
            ) : emailVerified && otpVerified ? (
              <ResetPassword />
            ) : (
              <VerifyEmail />
            )
          }
        />
        <Route
          path="/verify-otp"
          element={
            userToken ? (
              <Home />
            ) : !emailVerified && !otpVerified ? (
              <VerifyEmail />
            ) : emailVerified && otpVerified ? (
              <ResetPassword />
            ) : (
              <VerifyOTP />
            )
          }
        />
        <Route
          path="/reset-password"
          element={
            userToken ? (
              <Home />
            ) : !emailVerified ? (
              <VerifyEmail />
            ) : !otpVerified ? (
              <VerifyOTP />
            ) : (
              <ResetPassword />
            )
          }
        />

        <Route path="/about-us" element={<AboutUs />} />
        <Route
          path="/profile"
          element={userToken ? <Profile /> : <LoginPage />}
        />
        <Route path="/found" element={<Found />} />
        <Route path="/lost" element={<Lost />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
      <BackToTop />
    </BrowserRouter>
  );
};

export default App;
