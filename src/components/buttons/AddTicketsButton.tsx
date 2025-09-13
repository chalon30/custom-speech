"use client";

import { TicketData } from "@/components/TicketBox";

interface AddTicketsButtonProps {
  tickets: TicketData[];
  existingTickets: TicketData[];
  onAdd: (tickets: TicketData[]) => void;
}

export default function AddTicketsButton({ tickets, existingTickets, onAdd }: AddTicketsButtonProps) {
  const handleClick = () => {
    const validTickets = tickets.filter(t => t.ticket.trim() !== "");
    if (validTickets.length === 0) {
      alert("No hay tickets válidos para agregar.");
      return;
    }

    const duplicates = validTickets.filter(t =>
      existingTickets.some(et => et.ticket === t.ticket)
    );
    const newTickets = validTickets.filter(t =>
      !existingTickets.some(et => et.ticket === t.ticket)
    );

    if (duplicates.length > 0) {
      alert(`Tickets duplicados no agregados: ${duplicates.map(d => d.ticket).join(", ")}`);
    }

    if (newTickets.length > 0) {
      onAdd(newTickets);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        px-3 py-1.5 sm:px-4 sm:py-2
        bg-blue-600 text-white text-sm sm:text-base font-medium
        rounded-md shadow-md hover:bg-blue-500
        transition-colors duration-200
      "
    >
      Agregar
    </button>
  );
}
