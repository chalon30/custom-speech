"use client";

import CopySpeechButton from "@/components/buttons/CopySpeechButton";
import { TicketData } from "../TicketBox";
import { useGreeting } from "@/context/GreetingContext"; 
import GreetingSelector from "@/components/GreetingSelector"; // 👈 selector visible

interface InicioProps {
  ticket?: string;
  tickets?: TicketData[];
}

// 🔹 Función para obtener saludo según hora de Perú
const getPeruGreeting = (): string => {
  const now = new Date();
  const peruHour = now.getUTCHours() - 5; // Perú = UTC-5
  const hour = (peruHour + 24) % 24; // normalizar 0-23

  if (hour >= 6 && hour < 12) return "Buenos días";
  if (hour >= 12 && hour < 19) return "Buenas tardes";
  return "Buenas noches";
};

export default function Inicio({ ticket, tickets = [] }: InicioProps) {
  const { saludo } = useGreeting(); // 👈 saludo global
  const greeting = getPeruGreeting();

  // Usar el primer ticket dinámico como principal si existe
  const mainTicket = tickets?.[0]?.ticket || ticket || "*******";

  // Primer speech
  const firstParagraphs = [
    `${greeting}, ${saludo}, reciban un cordial saludo.`,
    `Se genera el ticket ${mainTicket}`,
    "para atender lo solicitado.",
  ];
  const firstSpeechText = firstParagraphs.join("\n\n");

  // Segundo speech dinámico con numeración TK1, TK2, ...
  const secondParagraphs = [
    `${greeting}, ${saludo}, reciban un cordial saludo,`,
    "para atender lo solicitado se generan los siguientes tickets:",
    ...tickets.map(
      (t, i) =>
        `TK${i + 1}: ${t.ticket}${t.info ? ` (${t.info})` : ""}`
    ),
  ];
  const secondSpeechText = secondParagraphs.join("\n\n");

  // Tercer speech: alerta en revisión
  const thirdParagraphs = [
    `${greeting}, ${saludo},`,
    `la alerta se encuentra en revisión con el TK ${mainTicket}.`,
  ];
  const thirdSpeechText = thirdParagraphs.join("\n\n");

  return (
    <div className="p-6 space-y-6">
      {/* 🔹 Selector de saludo visible */}
      <GreetingSelector />

      {/* Primer speech */}
      <div className="space-y-4">
        {firstParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="flex justify-end">
          <CopySpeechButton text={firstSpeechText} />
        </div>
      </div>

      <hr className="my-4 border-gray-400" />

      {/* Segundo speech dinámico */}
      <div className="space-y-4">
        {secondParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="flex justify-end">
          <CopySpeechButton text={secondSpeechText} />
        </div>
      </div>

      <hr className="my-4 border-gray-400" />

      {/* Tercer speech */}
      <div className="space-y-4">
        {thirdParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="flex justify-end">
          <CopySpeechButton text={thirdSpeechText} />
        </div>
      </div>
    </div>
  );
}
