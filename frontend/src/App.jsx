import {BrowserRouter,Routes,Route} from "react-router-dom"
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1 style={{"textAlign" : "center"}}>Homepage Here!</h1>} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
