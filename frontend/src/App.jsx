import {BrowserRouter,Routes,Route} from "react-router-dom"
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Lol</h1>} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
