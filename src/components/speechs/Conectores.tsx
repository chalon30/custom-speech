"use client";

import CopySpeechButton from "@/components/buttons/CopySpeechButton";
import { TicketData } from "../TicketBox";

// Función para saludo según hora de Perú (Lima)
const getPeruGreeting = (): string => {
  const now = new Date();
  const peruHour = (now.getUTCHours() - 5 + 24) % 24; // Perú = UTC-5
  if (peruHour >= 6 && peruHour < 12) return "Buenos días";
  if (peruHour >= 12 && peruHour < 19) return "Buenas tardes";
  return "Buenas noches";
};

interface ConectoresProps {
  tickets?: TicketData[];
}

export default function Conectores({ tickets = [] }: ConectoresProps) {
  const greeting = getPeruGreeting();
  const mainTicket = tickets?.[0]?.ticket || "*******";

  const speechText = `${greeting}, estimados, reciban un cordial saludo, se procede con lo indicado (validar 3 conectores y asignar licencia). Adjunto evidencia.

TK: ${mainTicket}

Tres conectores validados:



Asignación de licencia:`;

  return (
    <div className="p-6 space-y-4">
      <pre className="whitespace-pre-wrap">{speechText}</pre>
      <div className="flex justify-end">
        <CopySpeechButton text={speechText} />
      </div>
    </div>
  );
}
