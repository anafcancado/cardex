function CarCard({ carro, onDelete }) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 text-center relative hover:scale-105 transition-transform">
      <div className="w-full h-36 mb-2 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        {carro.imagem ? (
          <img
            src={carro.imagem}
            alt={`${carro.marca} ${carro.modelo}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={`https://placehold.co/400x240?text=${encodeURIComponent(
              carro.marca + " " + carro.modelo
            )}`}
            alt={`${carro.marca} ${carro.modelo}`}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <h3 className="font-semibold text-lg text-gray-900">{carro.marca}</h3>
      <p className="text-gray-700">{carro.modelo}</p>
      <span className="text-sm text-gray-600">{carro.ano}</span>

      {onDelete && (
        <button
          onClick={() => onDelete(carro.id)}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5"
          title="Remover"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default CarCard;
