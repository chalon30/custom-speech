"use client";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useEffect, useState, useRef } from "react";

interface SpeechBarProps {
  selected: string;
  onSelect: (item: string) => void;
}

// Mover items fuera del componente evita recrearlo en cada render
const items = [
  "REQ/INC",
  "TRANSPORTES",
  "ESCALAMIENTO",
  "CONECTORES",
  "ADICIONAL",
];

export default function SpeechBar({ selected, onSelect }: SpeechBarProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  // Actualizar posición del underline cuando cambia la selección
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const selectedButton = Array.from(container.children).find((li) => {
      const button = li.firstChild as HTMLButtonElement | null;
      return button?.textContent === selected;
    }) as HTMLLIElement | undefined;

    if (!selectedButton) return;

    const rect = selectedButton.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();
    setUnderlineStyle({
      left: rect.left - parentRect.left + container.scrollLeft,
      width: rect.width,
    });
  }, [selected]);

  return (
    <nav
      className="w-full sticky top-0 z-20 select-none shadow-md"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <SimpleBar
        style={{ maxHeight: "none", padding: "0.5rem 0" }}
        autoHide={false}
        className="overflow-x-auto"
      >
        <ul
          ref={containerRef}
          className="flex gap-6 px-6 sm:px-12 justify-start sm:justify-center relative"
        >
          {items.map((item) => (
            <li key={item} className="flex-shrink-0">
              <button
                onClick={() => onSelect(item)}
                className={`font-semibold px-6 py-3 rounded-md transition-all duration-300 ${
                  selected === item
                    ? "text-orange-600"
                    : "text-gray-400 hover:text-orange-500"
                } focus:outline-none`}
              >
                {item}
              </button>
            </li>
          ))}

          {/* Underline animado */}
          <span
            className="absolute bottom-0 h-1 bg-orange-600 rounded transition-all duration-300"
            style={{ left: underlineStyle.left, width: underlineStyle.width }}
          />
        </ul>
      </SimpleBar>
    </nav>
  );
}
