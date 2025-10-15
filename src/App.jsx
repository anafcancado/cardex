import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import CameraPage from "./pages/CameraPage";
import ResultPage from "./pages/ResultPage";
import CardexPage from "./pages/CardexPage";
import { identifyCar } from "./services/aiService";

function AppContent() {
  const [capturedCars, setCapturedCars] = useState([]);
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [filter, setFilter] = useState("descobertos");
  
  const navigate = useNavigate();

  const goTo = (page) => {
    navigate(`/${page}`);
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imgData = canvas.toDataURL("image/png");
    setScreenshot(imgData);
    stopCamera();
  };

  const retakePhoto = () => {
    setScreenshot(null);
    startCamera();
  };

  const confirmPhoto = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await identifyCar(screenshot);
      console.log("Resultado da API:", result);
      setCapturedCars(prevCars => [...prevCars, { ...result, id: Date.now() }]);
      goTo("result");
    } catch (error) {
      console.error("Erro ao identificar carro:", error);
      setError("Erro ao identificar carro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const commonProps = {
    goTo,
    screenshot,
    setScreenshot,
    startCamera,
    stopCamera,
    takePhoto,
    retakePhoto,
    confirmPhoto,
    capturedCars,
    setCapturedCars,
    loading,
    filter,
    setFilter,
    videoRef
  };

  return (
    <>
      {error && (
        <div style={{
          background: "#fee2e2",
          color: "#991b1b",
          padding: "12px",
          borderRadius: "8px",
          margin: "16px",
          textAlign: "center"
        }}>
          {error}
        </div>
      )}
      <Routes>
        <Route path="/" element={<WelcomePage {...commonProps} />} />
        <Route path="/welcome" element={<WelcomePage {...commonProps} />} />
        <Route path="/home" element={<HomePage {...commonProps} />} />
        <Route path="/camera" element={<CameraPage {...commonProps} />} />
        <Route path="/result" element={<ResultPage {...commonProps} />} />
        <Route path="/cardex" element={<CardexPage {...commonProps} />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}