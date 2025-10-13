import { useState } from "react";

function Logo({ className = "", src = "/cardex-fundo.png", alt = "Cardex" }) {
  const [err, setErr] = useState(false);

  // If image loads, show it; on error, show the text fallback
  return !err ? (
    <img
      src={src}
      alt={alt}
      onError={() => setErr(true)}
      className={`object-contain ${className}`}
    />
  ) : (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="text-3xl font-bold tracking-tight">Cardex</span>
      <span className="text-sm text-gray-300">🚗</span>
    </div>
  );
}

export default Logo;
