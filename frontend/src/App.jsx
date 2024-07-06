import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  LoginPage,
  ResetPassword,
  SignUp,
  VerifyEmail,
  VerifyOTP,
} from "./pages";

// checking
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<h1 style={{ textAlign: "center" }}>Homepage Here!</h1>}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<VerifyEmail />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
