"use client";

import { useState } from "react";
import SpeechBar from "./SpeechBar";
import TicketBox, { TicketData } from "./TicketBox";
import AddTicketsButton from "@/components/buttons/AddTicketsButton";
import TicketsTable from "./TicketsTable";

// Importa los componentes de cada speech
import Inicio from "./speechs/ReqInc";
import Transportes from "./speechs/Transportes";

export default function SpeechsMain() {
  const [selected, setSelected] = useState("REQ/INC");
  const [tickets, setTickets] = useState<TicketData[]>([{ ticket: "", info: "" }]);
  const [tableTickets, setTableTickets] = useState<TicketData[]>([]);

  // Agregar tickets a la tabla
  const handleAddToTable = (newTickets: TicketData[]) => {
    const validTickets = newTickets
      .filter(t => t.ticket.trim() !== "")
      .map(t => ({ ...t }));
    setTableTickets([...tableTickets, ...validTickets]);
  };

  // Renderiza el contenido dinámico según el botón seleccionado
  const renderContent = () => {
    switch (selected) {
      case "REQ/INC":
        return <Inicio tickets={tickets} />;
      case "TRANSPORTES":
        return <Transportes tickets={tickets} />;
      default:
        return <div>Selecciona una opción</div>;
    }
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
          <TicketBox selected={selected} onChange={setTickets} />

          {/* Botón agregar a tabla */}
          <AddTicketsButton 
            tickets={tickets} 
            existingTickets={tableTickets} 
            onAdd={handleAddToTable} 
          />

          {/* Contenido dinámico */}
          <div className="mt-4">
            {renderContent()}
          </div>
        </div>

        {/* Sección derecha: tabla de tickets */}
        <div className="w-full md:w-1/3 order-1 md:order-2">
          <TicketsTable
            tickets={tableTickets}
            onUpdate={setTableTickets}
          />
        </div>

      </div>
    </div>
  );
}
