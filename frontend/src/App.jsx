import {BrowserRouter,Routes,Route} from "react-router-dom"
import {NavBar,Footer} from "./components"
import { LoginPage, SignUp } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<h1 style={{ textAlign: "center" }}>Homepage Here!</h1>}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
