import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Welcome() {
  return (
    <div className="app-screen app-screen--dark relative flex flex-col items-center justify-center h-full overflow-hidden bg-[url('/fundoMapa.png')] bg-cover bg-center">
      {/* Fundo escurecido (reduzido para deixar o mapa mais visível) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Conteúdo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center space-y-6 p-6 text-white"
      >
        {/* logo from public folder */}
        <img
          src="/cardex-fundo.png"
          alt="Cardex Logo"
          className="w-28 h-28 object-contain rounded-md shadow-sm"
        />

        <p className="text-center text-white text-lg max-w-xs">
          Descubra e capture todos os carros do mundo!
        </p>

        <Link
          to="/home"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all"
        >
          Começar Jornada
        </Link>
      </motion.div>
    </div>
  );
}

export default Welcome;
