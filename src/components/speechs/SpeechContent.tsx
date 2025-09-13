"use client";

import Inicio from "./Inicio";
// import Discursos from "./speechs/Discursos";
// import Ensayos from "./speechs/Ensayos";
// import Ideas from "./speechs/Ideas";

interface SpeechContentProps {
  selected: string;
  ticket?: string; // <-- Asegúrate de agregar esta línea
}

export default function SpeechContent({ selected, ticket }: SpeechContentProps) {
  switch (selected) {
    case "Inicio":
      return <Inicio ticket={ticket} />;
    // case "Discursos":
    //   return <Discursos />;
    // case "Ensayos":
    //   return <Ensayos />;
    // case "Ideas":
    //   return <Ideas />;
    default:
      return (
        <div className="p-6 text-center text-gray-500 select-none">
          {selected} aún no tiene contenido.
        </div>
      );
  }
}
