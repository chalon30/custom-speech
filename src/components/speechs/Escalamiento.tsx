"use client";

import CopySpeechButton from "@/components/buttons/CopySpeechButton";
import { TicketData } from "../TicketBox";
import { useGreeting } from "@/context/GreetingContext"; // 👈 saludo global
import GreetingSelector from "@/components/GreetingSelector"; // 👈 selector visible

// Función para saludo según hora de Perú (Lima)
const getPeruGreeting = (): string => {
  const now = new Date();
  const peruHour = (now.getUTCHours() - 5 + 24) % 24; // Perú = UTC-5
  if (peruHour >= 6 && peruHour < 12) return "Buenos días";
  if (peruHour >= 12 && peruHour < 19) return "Buenas tardes";
  return "Buenas noches";
};

interface EscalamientoProps {
  tickets?: TicketData[];
}

export default function Escalamiento({ tickets = [] }: EscalamientoProps) {
  const { saludo } = useGreeting(); // 👈 usamos el saludo global
  const greeting = getPeruGreeting();
  const mainTicket = tickets?.[0]?.ticket || "*******";

  // ---- SPEECHS ----
  const speech1 = `${greeting}, ${saludo}, reciban un cordial saludo.

Favor su apoyo indicando si se procederá con la generación del ticket, 
ya que el usuario no figura en la matriz.`;

  const speech2 = `${greeting}, ${saludo}, reciban un cordial saludo.

Estamos escalando el caso con el especialista asignado 
para que le brinde una respuesta a la brevedad posible.`;

  const speech3 = `${greeting}, ${saludo},

Estimado @

Favor su apoyo en brindar lo solicitado por el cliente en correo infra.

Ticket: ${mainTicket}`;

  const speech4 = `${greeting}, ${saludo}, reciba un cordial saludo.

Su apoyo confirmando si el cliente cuenta con licencias disponibles en su línea base, 
para proceder con la creación del ticket.`;

  // ---- Render ----
  const speeches = [speech1, speech2, speech3, speech4];

  return (
    <div className="p-6 space-y-8">
      {/* 👇 Selector de saludo visible */}
      <GreetingSelector />

      {speeches.map((s, i) => (
        <div key={i} className="space-y-4">
          <pre className="whitespace-pre-wrap">{s}</pre>
          <div className="flex justify-end">
            <CopySpeechButton text={s} />
          </div>
          {i < speeches.length - 1 && (
            <hr className="my-6 border-t border-dashed border-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
}
