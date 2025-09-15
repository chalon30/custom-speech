"use client";

import CopySpeechButton from "@/components/buttons/CopySpeechButton";

export default function Adicional() {
  const text = `UNACEM:
PR1 --> Mandante: 400 (Se marca SOLO la 1era opción) 
 
La Positiva:
QAS --> Mandante: 300 (Se marca SOLO la 1era opción) 
QA2 --> Mandante: 300 (Se marca la 1era y última opción)
 
Retransporte:  
QAS (Se marcan los 4 primeros)
QA2 (Se marcan los 4 primeros y el último)

Frenosa:
FRQ = QAS --> Mandante 220 (Se marca SOLO la 1era opción)
FRP = PRD --> Mandante 300 (Se marca la 1era y última opción)
Retransporte:  (Se marca los 4 primeros en ambos casos)`;

  return (
    <div className="p-6 space-y-4">
      <pre className="whitespace-pre-wrap">{text}</pre>
      <div className="flex justify-end">
        <CopySpeechButton text={text} />
      </div>
    </div>
  );
}
