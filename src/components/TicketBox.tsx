"use client";

import { useState } from "react";

interface TicketBoxProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function TicketBox({ placeholder = "Ingrese su ticket", onChange }: TicketBoxProps) {
  const [ticket, setTicket] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTicket(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="w-full max-w-md mx-auto my-4">
      <input
        type="text"
        value={ticket}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full px-4 py-2 border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
          transition-all duration-200
          placeholder-gray-400
        "
      />
    </div>
  );
}
