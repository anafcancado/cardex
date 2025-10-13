import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ResultScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const stateCar = location.state;
  const stored = JSON.parse(localStorage.getItem("cardex") || "[]");
  const lastStored = stored.length ? stored[0] : null;

  const car =
    stateCar ||
    lastStored || {
      marca: "Desconhecido",
      modelo: "Desconhecido",
      ano: "—",
      imagem: "/cars/placeholder.png",
    };

  return (
    <div className="h-full flex flex-col p-4 bg-gradient-to-b from-gray-900 to-black text-white">
      {/* header - keeps title visible */}
      <header className="mb-2">
        <h1 className="text-lg font-bold tracking-wide">
          NOVO CARRO DESCOBERTO!
        </h1>
      </header>

      {/* scrollable main area */}
      <main className="flex-1 overflow-auto flex items-start justify-center">
        <div className="z-10 flex flex-col items-center text-center space-y-4 w-full max-w-xs">
          <div className="bg-gray-800 bg-opacity-70 rounded-3xl p-4 shadow-lg border border-gray-700 w-full">
            <img
              src={car.imagem}
              alt={car.modelo}
              className="w-full h-40 object-contain rounded-lg mb-3"
            />
            <div className="space-y-1">
              <p className="text-lg font-semibold">{car.marca}</p>
              <p className="text-sm text-gray-300">{car.modelo}</p>
              <p className="text-sm text-gray-400">{car.ano}</p>
            </div>
          </div>
        </div>
      </main>

      {/* footer - action button visible at bottom */}
      <footer className="mt-3">
        <button
          onClick={() => navigate("/cardex")}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-4 py-3 rounded-full shadow-lg hover:opacity-90 transition"
        >
          Adicionar à minha Cardex
        </button>
      </footer>
    </div>
  );
}

export default ResultScreen;
