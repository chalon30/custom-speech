"use client";

import { useState } from "react";
import { TicketData } from "./TicketBox";

interface TicketsTableProps {
  tickets: TicketData[];
  onUpdate: (updatedTickets: TicketData[]) => void; // obligatorio para sincronizar
}

export default function TicketsTable({ tickets, onUpdate }: TicketsTableProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  // Función para obtener la fecha actual en dd/mm/aa
  const getCurrentDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const handleDelete = (index: number) => {
    const newTickets = tickets.filter((_, i) => i !== index);
    onUpdate(newTickets); // actualizar en el padre
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(tickets[index].ticket);
  };

  const handleSave = (index: number) => {
    const newTickets = [...tickets];
    newTickets[index].ticket = editValue;
    setEditingIndex(null);
    setEditValue("");
    onUpdate(newTickets);
  };

  const handleCopyAll = () => {
    const date = getCurrentDate();
    const allTickets = [date, ...tickets.map(t => t.ticket)].join("\n");
    navigator.clipboard.writeText(allTickets);
  };

  const handleExport = () => {
    const date = getCurrentDate();
    const content = [date, ...tickets.map(t => t.ticket)].join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tickets_${date.replace(/\//g, "-")}.txt`; // nombre con fecha
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = (ticket: string) => {
    navigator.clipboard.writeText(ticket);
  };

  const handleClearAll = () => {
    if (confirm("¿Estás seguro que quieres limpiar todos los tickets?")) {
      onUpdate([]); // limpiar todos los tickets
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-end gap-2 mb-2">
        <button
          onClick={handleCopyAll}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-400 transition-colors"
        >
          Copiar todos
        </button>
        <button
          onClick={handleExport}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-400 transition-colors"
        >
          Exportar a .txt
        </button>
        <button
          onClick={handleClearAll}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition-colors"
        >
          Limpiar todos
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Ticket</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, i) => (
            <tr key={i}>
              <td className="border border-gray-300 px-4 py-2">
                {editingIndex === i ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value.replace(/[^0-9-]/g, ""))}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                ) : (
                  t.ticket
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex gap-1">
                {editingIndex === i ? (
                  <button
                    onClick={() => handleSave(i)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-400 transition-colors"
                  >
                    Guardar
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(i)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-400 transition-colors"
                    >
                      Editar
                    </button>
                    
                    <button
                      onClick={() => handleCopy(t.ticket)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-400 transition-colors"
                    >
                      Copiar
                    </button>

                    <button
                      onClick={() => handleDelete(i)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400 transition-colors"
                    >
                      Eliminar
                    </button>
                    
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
