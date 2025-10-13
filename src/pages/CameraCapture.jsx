import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { identifyCar } from "../services/aiService";
import { useNavigate } from "react-router-dom";

function CameraCapture() {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const navigate = useNavigate();

  const takePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;
    setScreenshot(imageSrc);
  };

  const retake = () => {
    setScreenshot(null);
  };

  const confirm = async () => {
    if (!screenshot) return;
    setLoading(true);
    try {
      const carData = await identifyCar(screenshot);
      if (!carData) throw new Error("Identificação falhou");

      const discovered = JSON.parse(localStorage.getItem("cardex")) || [];
      const exists = discovered.some(
        (item) => item.modelo === carData.modelo && item.marca === carData.marca
      );

      if (!exists) {
        discovered.unshift(carData);
        localStorage.setItem("cardex", JSON.stringify(discovered));
      }

      navigate("/result", { state: carData });
    } catch (err) {
      console.error(err);
      alert("Não foi possível identificar o carro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* full-height app page layout so footer stays visible */
    <div className="h-full flex flex-col p-4 bg-transparent">
      {/* header */}
      <header className="mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Capture um carro!</h2>
      </header>

      {/* main scrollable area */}
      <main className="flex-1 overflow-auto flex items-center justify-center">
        {!screenshot ? (
          <div
            className="w-full max-w-[360px] rounded-lg shadow-lg overflow-hidden bg-black"
            style={{ aspectRatio: "9/16" }}
          >
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 360,
                height: 640,
                facingMode: "environment",
              }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ) : (
          <div
            className="w-full max-w-[360px] rounded-lg overflow-hidden shadow-lg bg-gray-800"
            style={{ aspectRatio: "9/16" }}
          >
            <img
              src={screenshot}
              alt="preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </main>

      {/* footer - always visible */}
      <footer className="mt-3">
        {!screenshot ? (
          <div className="flex gap-3 justify-center">
            <button
              onClick={takePhoto}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
            >
              Tirar Foto
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div className="flex gap-3 justify-center">
            <button
              onClick={confirm}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg disabled:opacity-60"
            >
              {loading ? "Identificando..." : "Confirmar"}
            </button>
            <button
              onClick={retake}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
            >
              Retomar
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg"
            >
              Voltar
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}

export default CameraCapture;
