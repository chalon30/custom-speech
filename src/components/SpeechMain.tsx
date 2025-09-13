"use client";

import { useState } from "react";
import SpeechBar from "./SpeechBar";
import SpeechContent from "./speechs/SpeechContent";
import TicketBox from "./TicketBox";

export default function SpeechsMain() {
  const [selected, setSelected] = useState("Inicio");
  const [ticket, setTicket] = useState("");

  return (
    <div className="select-none">
      {/* Barra de navegación */}
      <SpeechBar selected={selected} onSelect={setSelected} />

      {/* Caja de ticket visible siempre */}
      <div className="mt-6">
        <TicketBox placeholder="Ingrese su ticket" onChange={setTicket} />
      </div>

      {/* Contenido dinámico */}
      <div className="mt-6">
        <SpeechContent selected={selected} ticket={ticket} />
      </div>
    </div>
  );
}
