export default function CardexPage({ goTo, capturedCars, filter, setFilter }) {
  // Gerar 100 carros não descobertos
  const undiscoveredCars = Array.from({ length: 100 }, (_, index) => ({
    id: `undiscovered-${index + 1}`,
    marca: "???",
    modelo: "???",
    ano: "???",
    imagem: null
  }));

  const filteredCars = filter === "descobertos" 
    ? capturedCars 
    : undiscoveredCars;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => goTo("home")} style={styles.headerButton}>
          ← Voltar
        </button>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="descobertos" style={styles.optionStyle}>Descobertos</option>
          <option value="nao-descobertos" style={styles.optionStyle}>Não Descobertos</option>
        </select>
      </header>

      <main style={styles.mainContent}>
        {filter === "descobertos" && filteredCars.length === 0 ? (
          <p style={styles.emptyMessage}>Nenhum carro descoberto ainda.</p>
        ) : (
          <div style={styles.carsGrid}>
            {filteredCars.map((carro) => (
              <div key={carro.id} style={styles.carCard}>
                <div style={styles.imageContainer}>
                  {carro.imagem ? (
                    <img
                      src={carro.imagem}
                      alt={carro.modelo}
                      style={styles.carImage}
                    />
                  ) : (
                    <div style={styles.placeholderImage}>
                      <span style={styles.placeholderText}>???</span>
                    </div>
                  )}
                </div>
                <p><strong>{carro.marca}</strong></p>
                <p style={styles.carModel}>{carro.modelo}</p>
                <p style={styles.carYear}>{carro.ano || "Desconhecido"}</p>
                {"confianca" in carro && (
                  <p style={{ fontSize: '12px', color: '#93c5fd' }}>
                    Confiança: {typeof carro.confianca === "number"
                      ? carro.confianca.toFixed(2) + "%"
                      : "Desconhecido"}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    background: 'rgba(0,0,0,0.2)',
    backdropFilter: 'blur(8px)'
  },
  headerButton: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer'
  },
  filterSelect: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    width: '200px',
  },
  optionStyle: {
    background: '#1e3a8a',
    color: 'white',
    padding: '8px'
  },
  mainContent: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto'
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#bfdbfe'
  },
  carsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '16px'
  },
  carCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '8px',
    textAlign: 'center',
    transition: 'transform 0.2s, opacity 0.2s'
  },
  imageContainer: {
    width: '100%',
    height: '100px',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  carImage: {
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    objectFit: 'cover'
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed rgba(255, 255, 255, 0.2)'
  },
  placeholderText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.3)'
  },
  carModel: {
    fontSize: '14px'
  },
  carYear: {
    fontSize: '12px',
    opacity: 0.8
  }
};