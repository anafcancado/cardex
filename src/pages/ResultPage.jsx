import { useState, useEffect } from "react";

export default function ResultPage({ goTo, capturedCars }) {
  const [showResult, setShowResult] = useState(false);
  const [shake, setShake] = useState(false);
  const lastCapturedCar = capturedCars.length > 0 ? capturedCars[capturedCars.length - 1] : null;

  useEffect(() => {
    setShowResult(false);
    setShake(false);
    // 1s shake, 1s brilho, depois mostra resultado
    const shakeTimer = setTimeout(() => setShake(true), 500);
    const resultTimer = setTimeout(() => setShowResult(true), 2000);
    return () => {
      clearTimeout(shakeTimer);
      clearTimeout(resultTimer);
    };
  }, [lastCapturedCar]);

  if (!lastCapturedCar) {
    return (
      <div style={styles.emptyContainer}>
        <p>Nenhum carro identificado.</p>
        <button onClick={() => goTo("home")} style={styles.button}>
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {!showResult ? (
        <div className="capture-animation">
          <div className="energy-aura"></div>
          <div className="pulse-circle"></div>
          <div
            className={
              "capture-ball" +
              (shake ? " shake capture-ball-glow" : "")
            }
          >
            <div className="ball-highlight"></div>
            <div className="ball-sparkle"></div>
          </div>
          <p className="capturing-text">
            <span className="capturing-text-anim">Capturando...</span>
          </p>
        </div>
      ) : (
        <>
          <h1 style={styles.title}>Carro Identificado!</h1>

          {lastCapturedCar.imagem && (
            <img
              src={lastCapturedCar.imagem}
              alt="Carro capturado"
              style={styles.carImage}
            />
          )}

          <div style={styles.carInfo}>
            <p><strong>Marca:</strong> {lastCapturedCar.marca || "Desconhecido"}</p>
            <p><strong>Modelo:</strong> {lastCapturedCar.modelo || "Desconhecido"}</p>
            {"confianca" in lastCapturedCar && (
              <p>
                <strong>Confiança:</strong>{" "}
                {typeof lastCapturedCar.confianca === "number"
                  ? lastCapturedCar.confianca.toFixed(2) + "%"
                  : "Desconhecido"}
              </p>
            )}
          </div>

          <button onClick={() => goTo("home")} style={styles.button}>
            Capturar Outro
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(to bottom, #1e3a8a, #172554)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px'
  },
  emptyContainer: {
    height: '100vh',
    background: 'linear-gradient(to bottom, #1e3a8a, #172554)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  carImage: {
    width: '100%',
    maxWidth: '320px',
    borderRadius: '12px',
    marginBottom: '16px'
  },
  carInfo: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '16px',
    textAlign: 'center',
    width: '100%',
    maxWidth: '320px',
    marginBottom: '24px'
  },
  button: {
    background: 'linear-gradient(to right, #3b82f6, #2563eb)',
    color: 'white',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s'
  }
};

/*
Adicione no seu index.css:

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.7; }
  70% { transform: scale(1.3); opacity: 0.2; }
  100% { transform: scale(1); opacity: 0.7; }
}
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
@keyframes shake {
  10%, 90% { transform: translateX(-2px);}
  20%, 80% { transform: translateX(4px);}
  30%, 50%, 70% { transform: translateX(-8px);}
  40%, 60% { transform: translateX(8px);}
}
@keyframes auraPulse {
  0% { opacity: 0.7; transform: scale(1);}
  50% { opacity: 0.3; transform: scale(1.15);}
  100% { opacity: 0.7; transform: scale(1);}
}
.capturing-text-anim {
  animation: textFlash 1.2s infinite;
}
@keyframes textFlash {
  0%, 100% { opacity: 1;}
  50% { opacity: 0.5;}
}
*/