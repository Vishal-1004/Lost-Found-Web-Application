import {BrowserRouter,Routes,Route} from "react-router-dom"
import {NavBar,Footer} from "./components"
import { LoginPage, SignUp } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      {/* <LoginPage />
      <SignUp /> */}
      <Routes>
        <Route path="/" element={<h1 style={{"textAlign" : "center"}}>Homepage Here!</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
};

export default App;
