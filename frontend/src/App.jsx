import {BrowserRouter,Routes,Route} from "react-router-dom"
import {NavBar,Footer} from "./components"

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1 style={{"textAlign" : "center"}}>Homepage Here!</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
};

export default App;
