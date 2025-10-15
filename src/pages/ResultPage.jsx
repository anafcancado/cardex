export default function ResultPage({ goTo, capturedCars }) {
  const lastCapturedCar = capturedCars.length > 0 ? capturedCars[capturedCars.length - 1] : null;

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
      <h1 style={styles.title}>Carro Identificado!</h1>

      {lastCapturedCar.imagem && (
        <img
          src={lastCapturedCar.imagem}
          alt="Carro capturado"
          style={styles.carImage}
        />
      )}

      <div style={styles.carInfo}>
        <p><strong>Marca:</strong> {lastCapturedCar.marca}</p>
        <p><strong>Modelo:</strong> {lastCapturedCar.modelo}</p>
        <p><strong>Ano:</strong> {lastCapturedCar.ano || "Desconhecido"}</p>
        {"confianca" in lastCapturedCar && (
          <p><strong>Confiança:</strong> {lastCapturedCar.confianca.toFixed(2)}%</p>
        )}
      </div>

      <button onClick={() => goTo("home")} style={styles.button}>
        Capturar Outro
      </button>
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