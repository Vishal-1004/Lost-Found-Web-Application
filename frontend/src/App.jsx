import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Home,
  LoginPage,
  OurTeam,
  ResetPassword,
  SignUp,
  VerifyEmail,
  VerifyOTP,
  Profile
} from "./pages";
import { BackToTop, Footer, Navbar } from "./components";
import EditProfile from "./pages/EditProfile";

// checking
const App = () => {
  const userToken = useSelector((state) => state.storedUserData.userToken);
  const emailVerified = useSelector(
    (state) => state.resetPasswordState.emailVerified
  );
  const otpVerified = useSelector(
    (state) => state.resetPasswordState.otpVerified
  );

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

        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
      <BackToTop />
    </BrowserRouter>
  );
};

export default App;
