import { useEffect } from "react";
import { X } from "lucide-react";

export default function CameraPage({
  goTo,
  videoRef,
  screenshot,
  startCamera,
  stopCamera,
  takePhoto,
  retakePhoto,
  confirmPhoto,
  loading,
  capturedPhotos = [],
  removeCapturedPhoto
}) {

  // Liga a câmera somente quando não há fotos da galeria
  useEffect(() => {
    if (capturedPhotos.length === 0 && !screenshot) {
      startCamera();
      return () => stopCamera();
    }
  }, [startCamera, stopCamera, capturedPhotos, screenshot]);

  // Total de fotos = galeria + preview
  const totalPhotos = (capturedPhotos?.length || 0) + (screenshot ? 1 : 0);

  // Adicionar foto individual à galeria
  const handleAddPhoto = () => {
    if (screenshot) {
      // Combina as fotos existentes com a nova
      const newPhotos = [...capturedPhotos, screenshot];
      // Chama a API para identificar apenas a foto nova
      confirmPhoto([screenshot]);
    }
  };

  // Identificar todas as fotos de uma vez
  const handleIdentifyAll = () => {
    let fotosParaIdentificar = [];

    // Adiciona fotos da galeria
    if (capturedPhotos.length > 0) {
      fotosParaIdentificar = [...capturedPhotos];
    }

    // Adiciona a foto do preview, se existir
    if (screenshot) {
      fotosParaIdentificar.push(screenshot);
    }

    // Só identifica se houver fotos
    if (fotosParaIdentificar.length > 0) {
      confirmPhoto(fotosParaIdentificar);
    }
  };

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

      {/* ============================
           PREVIEW / VIDEO / GALERIA
         ============================ */}
      <div style={styles.mediaContainer}>

        {/* Foto do preview da câmera */}
        {screenshot && (
          <img src={screenshot} alt="Captura" style={styles.media} />
        )}

        {/* Primeira foto da galeria (quando não há preview) */}
        {!screenshot && capturedPhotos.length > 0 && (
          <img src={capturedPhotos[0]} alt="Foto Galeria" style={styles.media} />
        )}

        {/* Vídeo ao vivo (somente quando não há galeria nem preview) */}
        {!screenshot && capturedPhotos.length === 0 && (
          <video ref={videoRef} autoPlay playsInline style={styles.media} />
        )}
      </div>

      {/* ============================
           MINI GALERIA DE FOTOS
         ============================ */}
      {capturedPhotos.length > 0 && (
        <div style={styles.photoGallery}>
          <p style={styles.galleryLabel}>
            Fotos capturadas ({capturedPhotos.length}):
          </p>

          <div style={styles.galleryScroll}>
            {capturedPhotos.map((photo, idx) => (
              <div key={idx} style={styles.galleryItem}>
                <img
                  src={photo}
                  alt={`Foto ${idx + 1}`}
                  style={styles.galleryImage}
                />

                <button
                  onClick={() => removeCapturedPhoto(idx)}
                  style={styles.removeButton}
                  title="Remover"
                >
                  <X size={16} color="white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================
           BOTÕES DE AÇÃO
         ============================ */}
      <div style={styles.actionsContainer}>

        {/* CASO 1: Apenas vídeo ativo (sem fotos) */}
        {!screenshot && capturedPhotos.length === 0 && (
          <button onClick={takePhoto} style={styles.actionButton}>
            Tirar Foto 📸
          </button>
        )}

        {/* CASO 2: Tem preview da câmera */}
        {screenshot && (
          <>
            <button 
              onClick={retakePhoto} 
              style={styles.actionButton}
              disabled={loading}
            >
              Refazer 🔄
            </button>

            <button
              onClick={handleAddPhoto}
              disabled={loading}
              style={{
                ...styles.actionButton,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Processando..." : "Adicionar ✅"}
            </button>
          </>
        )}

        {/* CASO 3: Identificar todas as fotos */}
        {totalPhotos > 0 && (
          <button
            onClick={handleIdentifyAll}
            disabled={loading}
            style={{
              ...styles.actionButton,
              background: "linear-gradient(to right, #10b981, #059669)",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Processando..." : `Identificar ${totalPhotos} 🚗`}
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================
   ESTILOS
   ============================ */
const styles = {
  container: {
    height: "100vh",
    background: 'linear-gradient(to bottom, #1e3a8a, #172554)',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingBottom: "20px"
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    cursor: "pointer",
    zIndex: 10
  },
  mediaContainer: {
    width: "100%",
    maxWidth: "480px",
    display: "flex",
    justifyContent: "center"
  },
  media: {
    width: "100%",
    borderRadius: "12px",
    objectFit: "cover"
  },
  photoGallery: {
    marginTop: "16px",
    width: "100%",
    maxWidth: "480px"
  },
  galleryLabel: {
    color: "white",
    fontSize: "12px",
    marginBottom: "8px",
    marginLeft: "4px"
  },
  galleryScroll: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    paddingBottom: "8px"
  },
  galleryItem: {
    position: "relative",
    flexShrink: 0
  },
  galleryImage: {
    width: "60px",
    height: "60px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "2px solid rgba(255,255,255,0.2)"
  },
  removeButton: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "rgba(239,68,68,0.9)",
    border: "none",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    transition: "all 0.2s"
  },
  actionsContainer: {
    marginTop: "16px",
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: "480px"
  },
  actionButton: {
    background: "linear-gradient(to right, #3b82f6, #2563eb)",
    color: "white",
    fontWeight: "600",
    padding: "10px 16px",
    borderRadius: "9999px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
    whiteSpace: "nowrap"
  }
};