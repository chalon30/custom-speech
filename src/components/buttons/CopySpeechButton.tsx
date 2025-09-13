"use client";

import { useState } from "react";

interface CopySpeechButtonProps {
  text: string;
}

export default function CopySpeechButton({ text }: CopySpeechButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const formattedText = text.trim();

    navigator.clipboard.writeText(formattedText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 500); // Mensaje por 0.5 segundos
      })
      .catch(() => setCopied(false));
  };

  return (
    <div className="mt-4 flex flex-col items-end">
      <button
        onClick={handleCopy}
        className="
          px-4 py-2 bg-orange-600 text-white font-semibold rounded-md
          hover:bg-orange-500 transition-colors duration-200
        "
      >
        Copiar
      </button>

      {/* Contenedor para el mensaje, con altura fija */}
      <div className="h-6">
        {copied && (
          <p className="text-green-600 font-medium select-none">
            ¡Texto copiado en el portapapeles!
          </p>
        )}
      </div>
    </div>
  );
}
