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
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [filter, setFilter] = useState("descobertos");
  
  const navigate = useNavigate();

  const goTo = (page) => {
    navigate(`/${page}`);
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
      setError("Não foi possível acessar a câmera");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgData = canvas.toDataURL("image/png");
    setScreenshot(imgData);
  };

  const retakePhoto = () => {
    setScreenshot(null);
  };

  const removeCapturedPhoto = (index) => {
    setCapturedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const confirmPhoto = async (photos) => {
    setLoading(true);
    setError(null);
    try {
      // Normalizar para sempre trabalhar com array
      const imagesToProcess = Array.isArray(photos) ? photos : [photos];

      if (imagesToProcess.length === 0) {
        setError("Nenhuma imagem para processar");
        setLoading(false);
        return;
      }

      // Chamar a API unificada
      const results = await identifyCar(imagesToProcess);

      // Garantir que sempre retorna um array
      const resultsArray = Array.isArray(results) ? results : [results];

      console.log("Resultados da API:", resultsArray);

      // Adicionar aos carros capturados (sem duplicatas)
      setCapturedCars((prevCars) => {
        const newCars = resultsArray.filter(
          (result) =>
            !prevCars.some(
              (car) =>
                car.marca === result.marca &&
                car.modelo === result.modelo &&
                car.ano === result.ano
            )
        );
        return [...prevCars, ...newCars];
      });

      // Limpar estado da câmera
      setScreenshot(null);
      setCapturedPhotos([]);
      goTo("result");
    } catch (error) {
      console.error("Erro ao identificar carro:", error);
      setError("Erro ao identificar o carro. Tente novamente.");
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
    videoRef,
    capturedPhotos,
    setCapturedPhotos,
    removeCapturedPhoto,
    error,
    setError
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      
      {error && (
        <div style={{
          background: "#fee2e2",
          color: "#991b1b",
          padding: "12px",
          borderRadius: "8px",
          margin: "16px",
          textAlign: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999
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