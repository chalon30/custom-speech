"use client";

import CopySpeechButton from "@/components/buttons/CopySpeechButton";

interface InicioProps {
  ticket?: string;
}

export default function Inicio({ ticket }: InicioProps) {
  // Creamos los párrafos como un array de strings
  const paragraphs = [
    "Estimados, reciban un cordial saludo.",
    `Se genera el ticket ${ticket || "*******"}`,
    "para atender lo solicitado."
  ];

  // Generamos el texto del speech que se copiará, con línea en blanco entre párrafos
  const speechText = paragraphs.join("\n\n");

  return (

    
    <div className="p-6 space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="mb-0">
          {p}
        </p>
      ))}

      {/* Botón para copiar el speech alineado a la derecha */}
      <div className="flex justify-end">
        <CopySpeechButton text={speechText} />
      </div>

      <hr className="my-4 border-gray-400" />
      
    </div>
  );
}
