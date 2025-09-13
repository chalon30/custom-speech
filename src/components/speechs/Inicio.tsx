"use client";

import CopySpeechButton from "@/components/buttons/CopySpeechButton";

interface TicketData {
  ticket: string;
  info?: string;
}

interface InicioProps {
  ticket?: string;
  tickets?: TicketData[];
}

// Función para obtener saludo según hora de Perú
const getPeruGreeting = (): string => {
  // Hora actual del navegador
  const now = new Date();

  // Convertir a hora de Perú usando UTC offset (-5)
  const peruHour = now.getUTCHours() - 5; // Perú = UTC-5
  const hour = (peruHour + 24) % 24; // normalizar 0-23

  if (hour >= 6 && hour < 12) return "Buenos días";
  if (hour >= 12 && hour < 19) return "Buenas tardes";
  return "Buenas noches";
};

export default function Inicio({ ticket, tickets = [] }: InicioProps) {
  const greeting = getPeruGreeting();

  // Usar el primer ticket dinámico como principal si existe
  const mainTicket = tickets?.[0]?.ticket || ticket || "*******";

  // Primer speech
  const firstParagraphs = [
    `${greeting}, estimados, reciban un cordial saludo.`,
    `Se genera el ticket ${mainTicket}`,
    "para atender lo solicitado."
  ];

  const firstSpeechText = firstParagraphs.join("\n\n");

  // Segundo speech dinámico con numeración TK1, TK2, ...
  const secondParagraphs = [
    `${greeting}, estimados, reciban un cordial saludo,`,
    "para atender lo solicitado se generan los siguientes tickets:",
    ...tickets.map((t, i) => `TK${i + 1}: ${t.ticket}${t.info ? ` (${t.info})` : ""}`)
  ];

  const secondSpeechText = secondParagraphs.join("\n\n");

  return (
    <div className="p-6 space-y-6">
      {/* Primer speech */}
      <div className="space-y-4">
        {firstParagraphs.map((p, i) => <p key={i}>{p}</p>)}
        <div className="flex justify-end">
          <CopySpeechButton text={firstSpeechText} />
        </div>
      </div>

      <hr className="my-4 border-gray-400" />

      {/* Segundo speech dinámico */}
      <div className="space-y-4">
        {secondParagraphs.map((p, i) => <p key={i}>{p}</p>)}
        <div className="flex justify-end">
          <CopySpeechButton text={secondSpeechText} />
        </div>
      </div>
    </div>
  );
}









