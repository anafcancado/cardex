import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/home";
import CameraCapture from "./pages/CameraCapture";
import Cardex from "./pages/Cardex";
import ResultScreen from "./pages/ResultScreen";

function App() {
  return (
    <Router>
      {/* full viewport bg and center the phone mockup */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        {/* phone frame: give a dark inner background and default white text so pages are readable */}
        <div className="phone-frame w-[390px] h-[844px] bg-[#073b5a] rounded-3xl shadow-2xl">
          {/* inner area where routes render; allow scrolling inside the phone frame; inherit white text by default */}
          <div className="h-full overflow-auto">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/home" element={<Home />} />
              <Route path="/camera" element={<CameraCapture />} />
              <Route path="/result" element={<ResultScreen />} />
              <Route path="/cardex" element={<Cardex />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
