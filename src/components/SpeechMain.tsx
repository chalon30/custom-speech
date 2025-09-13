"use client";

import { useState } from "react";
import SpeechBar from "./SpeechBar";
import SpeechContent from "./speechs/SpeechsContent";
import TicketBox, { TicketData } from "./TicketBox";
import AddTicketsButton from "@/components/buttons/AddTicketsButton";
import TicketsTable from "./TicketsTable";

export default function SpeechsMain() {
  const [selected, setSelected] = useState("Inicio");
  const [tickets, setTickets] = useState<TicketData[]>([{ ticket: "", info: "" }]);
  const [tableTickets, setTableTickets] = useState<TicketData[]>([]);

  // Agregar tickets a la tabla
  const handleAddToTable = (newTickets: TicketData[]) => {
    const validTickets = newTickets
      .filter(t => t.ticket.trim() !== "")
      .map(t => ({ ...t }));
    setTableTickets([...tableTickets, ...validTickets]);
  };

  return (
    <div className="select-none">
      {/* Barra de navegación sticky */}
      <SpeechBar selected={selected} onSelect={setSelected} />

      {/* Contenedor principal responsive */}
      <div className="mt-4 flex flex-col md:flex-row gap-6">

        {/* Sección izquierda: tickets y speeches */}
        <div className="flex-1 flex flex-col gap-4 order-2 md:order-1">
          {/* Caja de tickets */}
          <TicketBox onChange={setTickets} />

          {/* Botón agregar a tabla */}
          <AddTicketsButton 
            tickets={tickets} 
            existingTickets={tableTickets} // evita duplicados
            onAdd={handleAddToTable} 
          />

          {/* Contenido dinámico */}
          <div className="mt-4">
            <SpeechContent selected={selected} tickets={tickets} />
          </div>
        </div>

        {/* Sección derecha: tabla de tickets */}
        <div className="w-full md:w-1/3 order-1 md:order-2">
          <TicketsTable
            tickets={tableTickets}
            onUpdate={(updatedTickets) => setTableTickets(updatedTickets)}
          />
        </div>

      </div>
    </div>
  );
}
