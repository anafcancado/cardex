import { Camera, Upload } from "lucide-react";
import { useRef } from "react";

export default function HomePage({ goTo, startCamera, setScreenshot }) {
  const fileInputRef = useRef(null);

  const handleOpenCamera = () => {
    goTo("camera");
    setScreenshot(null);
    startCamera();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setScreenshot(imageData);
        goTo("camera");
      };
      reader.readAsDataURL(file);
    }
    // Reset do input para permitir selecionar o mesmo arquivo novamente
    event.target.value = '';
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => goTo("welcome")} style={styles.navButton}>
          ← Voltar
        </button>
        <button onClick={() => goTo("cardex")} style={styles.navButton}>
          Ver Cardex 📘
        </button>
      </header>

      <main style={styles.mainContent}>
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <div style={styles.iconContainer}>
              <Camera size={40} color="#bfdbfe" />
            </div>

            <button
              onClick={handleOpenCamera}
              style={styles.actionButton}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Abrir Câmera
            </button>

            <div style={styles.separator}>
              <span style={styles.separatorText}>ou</span>
            </div>

            <button
              onClick={handleUploadClick}
              style={styles.uploadButton}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              <Upload size={20} style={styles.uploadIcon} />
              Fazer Upload de Foto
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              style={styles.fileInput}
            />

            <p style={styles.instructionText}>
              Tire uma foto ou faça upload para identificar um carro
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(to bottom, #1e3a8a, #172554)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(8px)'
  },
  navButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px'
  },
  cardContainer: {
    width: '100%',
    maxWidth: '384px'
  },
  card: {
    background: 'rgba(30, 58, 138, 0.5)',
    backdropFilter: 'blur(8px)',
    borderRadius: '24px',
    padding: '32px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  },
  iconContainer: {
    borderRadius: '9999px',
    background: 'rgba(30, 58, 138, 0.5)',
    padding: '16px',
    marginBottom: '24px',
    width: 'fit-content',
    margin: '0 auto 24px auto'
  },
  actionButton: {
    width: '100%',
    background: 'linear-gradient(to right, #3b82f6, #2563eb)',
    color: 'white',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '9999px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    marginBottom: '16px'
  },
  uploadButton: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontWeight: '600',
    padding: '12px 24px',
    borderRadius: '9999px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'transform 0.2s',
    marginBottom: '16px'
  },
  uploadIcon: {
    marginRight: '4px'
  },
  separatorText: {
    color: '#bfdbfe',
    fontSize: '14px',
    margin: '0 16px',
    padding: '0 12px',
    zIndex: '1',
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  separator: {
    display: 'flex',
    alignItems: 'center',
    margin: '16px 0',
    position: 'relative',
    '::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: '1px',
      background: 'rgba(255, 255, 255, 0.1)',
      zIndex: 0
    }
  },
  fileInput: {
    display: 'none'
  },
  instructionText: {
    color: '#bfdbfe',
    marginTop: '16px',
    textAlign: 'center',
    fontSize: '14px'
  }
};