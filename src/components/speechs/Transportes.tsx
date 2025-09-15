"use client";

import CopySpeechButton from "@/components/buttons/CopySpeechButton";
import { TicketData } from "../TicketBox";

interface TransportesProps {
  tickets?: TicketData[];
}

// Función para saludo según hora de Perú (Lima)
const getPeruGreeting = (): string => {
  const now = new Date();
  const peruHour = (now.getUTCHours() - 5 + 24) % 24; // Perú = UTC-5
  if (peruHour >= 6 && peruHour < 12) return "Buenos días";
  if (peruHour >= 12 && peruHour < 19) return "Buenas tardes";
  return "Buenas noches";
};

export default function Transportes({ tickets = [] }: TransportesProps) {
  const greeting = getPeruGreeting();
  const transporteText =
    tickets.length > 1 ? "los transportes" : "el transporte";

  // Parte inicial: saludo e introducción (siempre)
  let speechText = `${greeting}, estimada, reciba un cordial saludo;\n\nSe procede con ${transporteText}.\n\n`;

  if (tickets.length === 0) {
    // Caso sin tickets
    speechText += `Ticket: *******\n\nOT: *******\n\nSe adjunta evidencia:`;
  } else {
    // Caso con tickets
    speechText += tickets
      .map((t) => {
        const lines: string[] = [];

        if (t.ticket) lines.push(`Ticket: ${t.ticket}`);
        if (t.qas) lines.push(`QAS: ${t.qas}`);
        if (t.qa2) lines.push(`QA2: ${t.qa2}`);

        const ots =
          Array.isArray(t.ots) && t.ots.length > 0
            ? t.ots
            : [t.ot || "*******"];

        ots.forEach((ot) => {
          lines.push(`OT: ${ot}`);
          lines.push(`Se adjunta evidencia:`);
        });

        return lines.join("\n\n");
      })
      .join("\n\n\n"); // espacio entre tickets distintos
  }

  return (
    <div className="p-6 space-y-4">
      <pre className="whitespace-pre-wrap">{speechText}</pre>
      <div className="flex justify-end">
        <CopySpeechButton text={speechText} />
      </div>
    </div>
  );
}
