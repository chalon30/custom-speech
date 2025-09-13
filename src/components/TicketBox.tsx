"use client";

import { useState } from "react";

export interface TicketData {
  ticket: string;
  info?: string;
}

interface TicketBoxProps {
  placeholder?: string;
  infoPlaceholder?: string;
  onChange?: (values: TicketData[]) => void;
}

export default function TicketBox({
  placeholder = "Ingrese su ticket",
  infoPlaceholder = "Nombre de la Torre",
  onChange,
}: TicketBoxProps) {
  const [tickets, setTickets] = useState<TicketData[]>([{ ticket: "", info: "" }]);

  const handleChange = (index: number, field: "ticket" | "info", value: string) => {
    const newTickets = [...tickets];

    if (field === "ticket") {
      const sanitized = value.replace(/[^0-9-]/g, "");
      newTickets[index][field] = sanitized;
    } else {
      newTickets[index][field] = value;
    }

    setTickets(newTickets);
    if (onChange) onChange(newTickets);
  };

  const handleAdd = () => setTickets([...tickets, { ticket: "", info: "" }]);
  const handleRemove = (index: number) => {
    if (tickets.length === 1) return;
    const newTickets = tickets.filter((_, i) => i !== index);
    setTickets(newTickets);
    if (onChange) onChange(newTickets);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-4 space-y-2">
      {tickets.map((t, index) => (
        <div key={index} className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            value={t.ticket}
            onChange={(e) => handleChange(index, "ticket", e.target.value)}
            placeholder={`${placeholder} ${index + 1}`}
            className="
              flex-[2] max-w-[140px] px-2 py-2 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
              transition-all duration-200 placeholder-gray-400
            "
          />

          {tickets.length > 1 && (
            <input
              type="text"
              value={t.info || ""}
              onChange={(e) => handleChange(index, "info", e.target.value)}
              placeholder={infoPlaceholder}
              className="
                flex-[3] max-w-[180px] px-2 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-all duration-200 placeholder-gray-400
              "
            />
          )}

          <div className="flex gap-1 mt-1 sm:mt-0">
            <button
              type="button"
              onClick={handleAdd}
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-400 transition-colors"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-400 transition-colors"
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
