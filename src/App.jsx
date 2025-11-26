import { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CameraPage from "./pages/CameraPage";
import ResultPage from "./pages/ResultPage";
import CardexPage from "./pages/CardexPage";
import { identifyCar } from "./services/aiService";
import { getUser, isAuthenticated } from "./services/authService";
import { addCarToCollection, getUserCollection } from "./services/carsService";


function AppContent() {
  const [capturedCars, setCapturedCars] = useState([]); // histórico
  const [currentBatch, setCurrentBatch] = useState([]); // lote do envio atual
  const [screenshot, setScreenshot] = useState(null);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [filter, setFilter] = useState("descobertos");

  const navigate = useNavigate();

  // Verificar autenticação ao carregar
  useEffect(() => {
    if (isAuthenticated()) {
      const user = getUser();
      setCurrentUser(user);
      loadUserCollection();
    }
  }, []);

  // Carregar coleção do usuário do backend
  const loadUserCollection = async () => {
    try {
      const data = await getUserCollection();
      console.log("Coleção carregada do backend:", data);
      
      // Converter carros do backend para o formato do estado local
      const carsFromBackend = data.cars.map(car => ({
        id: car.id.toString(),
        marca: car.carBrand,
        modelo: car.carModel,
        imagem: `http://localhost:3001${car.imagePath}`,
        ano: "",
        detectedAt: car.detectedAt
      }));
      
      setCapturedCars(carsFromBackend);
    } catch (error) {
      console.error("Erro ao carregar coleção:", error);
    }
  };

  const goTo = (page) => {
    navigate(`/${page}`);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    loadUserCollection();
  };

  const handleRegisterSuccess = (user) => {
    setCurrentUser(user);
    loadUserCollection();
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

      // Chamar a API de IA para identificar
      const results = await identifyCar(imagesToProcess);

      // Garantir que sempre retorna um array
      const resultsArray = Array.isArray(results) ? results : [results];

      console.log("Resultados da API de IA:", resultsArray);

      // Salvar os carros no backend (se o usuário estiver autenticado)
      if (isAuthenticated()) {
        for (const result of resultsArray) {
          try {
            await addCarToCollection(
              result.marca,
              result.modelo,
              result.imagem
            );
            console.log(`✅ Carro salvo: ${result.marca} ${result.modelo}`);
          } catch (err) {
            console.error("Erro ao salvar carro no backend:", err);
            // Se for duplicata, não é erro crítico
            if (!err.message.includes('já possui')) {
              setError("Alguns carros não puderam ser salvos");
            }
          }
        }
      }

      setCurrentBatch(resultsArray);

      // Adicionar aos carros capturados no estado local (sem duplicatas)
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
    currentBatch,
    loading,
    filter,
    setFilter,
    videoRef,
    capturedPhotos,
    setCapturedPhotos,
    removeCapturedPhoto,
    error,
    setError,
    currentUser,
    setCurrentUser,
    onLoginSuccess: handleLoginSuccess,
    onRegisterSuccess: handleRegisterSuccess
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
        <Route path="/login" element={<LoginPage {...commonProps} />} />
        <Route path="/register" element={<RegisterPage {...commonProps} />} />
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