"use client";

interface SpeechBarProps {
  selected: string;
  onSelect: (item: string) => void;
}

export default function SpeechBar({ selected, onSelect }: SpeechBarProps) {
  const items = ["REQ/INC", "TRANSPORTES", "Ensayos", "Ideas"];

  return (
    <nav
      className="w-full sticky top-0 z-10 select-none"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <ul className="flex gap-4 sm:gap-8 px-4 overflow-x-auto scrollbar-hide justify-start sm:justify-center">
        {items.map((item) => (
          <li key={item} className="flex-shrink-0">
            <button
              onClick={() => onSelect(item)}
              className={`
                font-semibold px-4 py-3 rounded-md transition-all duration-300
                ${
                  selected === item
                    ? "text-orange-600 border-b-2 border-orange-600 shadow-md"
                    : "hover:text-orange-500"
                }
                focus:outline-none cursor-pointer select-none
              `}
              style={{
                color: selected === item ? "var(--foreground)" : "var(--foreground)",
              }}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
