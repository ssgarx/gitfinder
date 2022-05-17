import Home from "./Screens/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favourites from "./Screens/Favourites";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
