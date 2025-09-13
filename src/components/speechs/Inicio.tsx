"use client";

import { useEffect, useState } from "react";
import CopySpeechButton from "@/components/buttons/CopySpeechButton";

interface TicketData {
  ticket: string;
  info?: string;
}

interface InicioProps {
  ticket?: string;
  tickets?: TicketData[];
}

export default function Inicio({ ticket, tickets = [] }: InicioProps) {
  const [greeting, setGreeting] = useState("Hola");

  // Obtener hora de Perú desde internet
  useEffect(() => {
    const fetchTime = async () => {
      try {
        const res = await fetch("http://worldtimeapi.org/api/timezone/America/Lima");
        const data = await res.json();
        const hour = new Date(data.datetime).getHours();

        if (hour >= 6 && hour < 12) setGreeting("Buenos días");
        else if (hour >= 12 && hour < 19) setGreeting("Buenas tardes");
        else setGreeting("Buenas noches");
      } catch (err) {
        console.error("Error al obtener hora de Perú:", err);
      }
    };
    fetchTime();
  }, []);

  const mainTicket = tickets?.[0]?.ticket || ticket || "*******";

  const firstParagraphs = [
    `${greeting}, estimados, reciban un cordial saludo.`,
    `Se genera el ticket ${mainTicket}`,
    "para atender lo solicitado."
  ];

  const firstSpeechText = firstParagraphs.join("\n\n");

  const secondParagraphs = [
    `${greeting}, estimados, reciban un cordial saludo,`,
    "para atender lo solicitado se generan los siguientes tickets:",
    ...tickets.map((t, i) => `TK${i + 1}: ${t.ticket}${t.info ? ` (${t.info})` : ""}`)
  ];

  const secondSpeechText = secondParagraphs.join("\n\n");

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        {firstParagraphs.map((p, i) => <p key={i}>{p}</p>)}
        <div className="flex justify-end">
          <CopySpeechButton text={firstSpeechText} />
        </div>
      </div>

      <hr className="my-4 border-gray-400" />

      <div className="space-y-4">
        {secondParagraphs.map((p, i) => <p key={i}>{p}</p>)}
        <div className="flex justify-end">
          <CopySpeechButton text={secondSpeechText} />
        </div>
      </div>
    </div>
  );
}
