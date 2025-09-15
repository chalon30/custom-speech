"use client";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useEffect, useState, useRef, useCallback } from "react";

interface SpeechBarProps {
  selected: string;
  onSelect: (item: string) => void;
}

const items = ["REQ/INC", "TRANSPORTES", "ESCALAMIENTO", "CONECTORES", "ADICIONAL"];

export default function SpeechBar({ selected, onSelect }: SpeechBarProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  // Función memoizada
  const updateUnderline = useCallback(() => {
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

  // Ejecutar al montar y cuando cambie
  useEffect(() => {
    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [updateUnderline]);

  return (
    <nav
      className="w-full sticky top-0 z-20 select-none shadow-md bg-background text-foreground"
      aria-label="Speech navigation"
    >
      <SimpleBar
        style={{ maxHeight: "none", padding: "0.5rem 0" }}
        autoHide={false}
        className="overflow-x-auto"
      >
        <ul
          ref={containerRef}
          className="flex gap-6 px-6 sm:px-12 justify-start sm:justify-center relative"
          role="tablist"
        >
          {items.map((item) => {
            const isSelected = selected === item;
            return (
              <li key={item} className="flex-shrink-0">
                <button
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${item}`}
                  id={`tab-${item}`}
                  onClick={() => onSelect(item)}
                  className={`font-semibold px-6 py-3 rounded-md transition-all duration-300 ${
                    isSelected
                      ? "text-orange-600"
                      : "text-gray-400 hover:text-orange-500"
                  } focus:outline-none`}
                >
                  {item}
                </button>
              </li>
            );
          })}

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
