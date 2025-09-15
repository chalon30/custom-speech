"use client";

import Inicio from "@/components/speechs/ReqInc";
// import Discursos from "@/components/speechs/Discursos";
// import Ensayos from "@/components/speechs/Ensayos";
// import Ideas from "@/components/speechs/Ideas";

interface TicketData {
  ticket: string;
  info?: string;
}

interface SpeechContentProps {
  selected: string;
  ticket?: string;       // Para un solo ticket
  tickets?: TicketData[]; // Para múltiples tickets
}

export default function SpeechContent({ selected, ticket, tickets }: SpeechContentProps) {
  switch (selected) {
    case "REQ/INC":
      // Pasamos tanto el ticket principal como la lista completa de tickets
      const mainTicket = tickets?.[0]?.ticket || ticket;
      return <Inicio ticket={mainTicket} tickets={tickets} />;

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
