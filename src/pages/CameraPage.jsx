import { useEffect } from "react";

export default function CameraPage({
  goTo,
  videoRef,
  screenshot,
  startCamera,
  stopCamera,
  takePhoto,
  retakePhoto,
  confirmPhoto,
  loading
}) {
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div style={styles.container}>
      <button
        onClick={() => {
          stopCamera();
          goTo("home");
        }}
        style={styles.backButton}
      >
        ← Voltar
      </button>

      <div style={styles.mediaContainer}>
        {!screenshot ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={styles.media}
          />
        ) : (
          <img
            src={screenshot}
            alt="Captura"
            style={styles.media}
          />
        )}
      </div>

      <div style={styles.actionsContainer}>
        {!screenshot ? (
          <button onClick={takePhoto} style={styles.actionButton}>
            Tirar Foto 📸
          </button>
        ) : (
          <>
            <button onClick={retakePhoto} style={styles.actionButton}>
              Refazer 🔄
            </button>
            <button onClick={confirmPhoto} disabled={loading} style={styles.actionButton}>
              {loading ? "Identificando..." : "Confirmar ✅"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer'
  },
  mediaContainer: {
    width: '100%',
    maxWidth: '480px',
    display: 'flex',
    justifyContent: 'center'
  },
  media: {
    width: '100%',
    borderRadius: '12px'
  },
  actionsContainer: {
    marginTop: '20px',
    display: 'flex',
    gap: '12px'
  },
  actionButton: {
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