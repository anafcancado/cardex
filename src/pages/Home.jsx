import { Link } from "react-router-dom";
import { Camera } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../components/Logo";

function Home() {
  return (
    <div className="app-screen h-full bg-[#073b5a] text-white relative overflow-hidden">
      {/* header / safe area */}
      <header className="flex items-center justify-end px-4 pt-4">
        <Link
          to="/cardex"
          className="bg-white/6 backdrop-blur-sm text-white hover:bg-white/10 px-3 py-2 rounded-full shadow-sm"
          title="Ver Cardex"
        >
          Ver Cardex📘
        </Link>
      </header>

      {/* main content - centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xs flex flex-col items-center gap-6"
        >
          {/* logo */}
          <Logo className="w-24 h-24 rounded-md shadow-sm" />

          {/* camera card */}
          <div className="w-full bg-blue-800 bg-opacity-50 shadow-lg rounded-2xl p-5 flex flex-col items-center border border-white/6">
            <div className="rounded-full bg-blue-900 p-3 mb-4">
              <Camera size={34} className="text-blue-200" />
            </div>

            <Link
              to="/camera"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow transition"
            >
              Abrir Câmera
            </Link>

            <p className="text-blue-100 mt-3 text-center text-sm">
              Tire uma foto de um carro para identificá-lo.
            </p>
          </div>
        </motion.div>
      </main>

      {/* footer / small safe-area spacer */}
      <div className="h-6" />
    </div>
  );
}

export default Home;
