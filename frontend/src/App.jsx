import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Home,
  LoginPage,
  ResetPassword,
  SignUp,
  VerifyEmail,
  VerifyOTP,
} from "./pages";
import { Footer, Navbar } from "./components";

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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
