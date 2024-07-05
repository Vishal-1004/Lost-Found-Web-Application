import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SignUp } from "./pages";

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
