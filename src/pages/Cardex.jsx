import React, { useState } from "react";

function Cardex() {
  const [filtro, setFiltro] = useState("descobertos");

  const carros = [
    { id: 1, nome: "Ferrari", modelo: "488 GTB", descoberto: true, img: "/cars/ferrari.png" },
    { id: 2, nome: "Porsche", modelo: "911", descoberto: true, img: "/cars/porsche.png" },
    { id: 3, nome: "BMW", modelo: "M3", descoberto: true, img: "/cars/bmw.png" },
    { id: 4, nome: "Audi", modelo: "R8", descoberto: true, img: "/cars/audi.png" },
    { id: 5, nome: "Mercedes-Benz", modelo: "A45", descoberto: true, img: "/cars/mercedes.png" },
    { id: 6, nome: "???", modelo: "???", descoberto: false, img: "/cars/placeholder.png" },
    { id: 7, nome: "???", modelo: "???", descoberto: false, img: "/cars/placeholder.png" },
  ];

  const filtrados = carros.filter((c) => {
    if (filtro === "todos") return true;
    if (filtro === "descobertos") return c.descoberto;
    if (filtro === "nao") return !c.descoberto;
  });

  return (
    <div className="h-full bg-gray-900 text-white p-4">
      {/* Filtros */}
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => setFiltro("todos")}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            filtro === "todos" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFiltro("descobertos")}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            filtro === "descobertos" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          Descobertos
        </button>
        <button
          onClick={() => setFiltro("nao")}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            filtro === "nao" ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          Não descobertos
        </button>
      </div>

      {/* Progresso */}
      <div className="text-center mb-3">
        <p className="text-sm text-gray-400">
          {carros.filter((c) => c.descoberto).length}/{carros.length} Carros Descobertos
        </p>
        <div className="h-2 bg-gray-700 rounded-full mt-1 w-2/3 mx-auto">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{
              width: `${
                (carros.filter((c) => c.descoberto).length / carros.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {/* Grid de carros */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 justify-items-center">
        {filtrados.map((carro) => (
          <div
            key={carro.id}
            className={`relative rounded-2xl p-3 w-36 h-44 flex flex-col items-center justify-center shadow-md ${
              carro.descoberto
                ? "bg-gray-800 border border-blue-500 shadow-blue-500/50"
                : "bg-gray-800 opacity-40"
            }`}
          >
            <img
              src={carro.img}
              alt={carro.nome}
              className="w-24 h-16 object-contain mb-2"
            />
            <p className="font-semibold text-sm">{carro.nome}</p>
            <p className="text-xs text-gray-400">{carro.modelo}</p>
            {carro.descoberto && (
              <div className="absolute top-2 right-2 bg-blue-500 w-3 h-3 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cardex;

