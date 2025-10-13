import CarCard from "./CarCard";

function CardexGrid({ carros, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {carros.length === 0 ? (
        <p className="text-gray-600">Nenhum carro descoberto ainda 😢</p>
      ) : (
        carros.map((carro, i) => (
          <CarCard key={carro.id || i} carro={carro} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}

export default CardexGrid;
