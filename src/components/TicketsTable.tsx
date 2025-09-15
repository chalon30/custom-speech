"use client";

import { useState, useEffect } from "react";
import { TicketData } from "./TicketBox";

interface TicketsTableProps {
  tickets: TicketData[];
  onUpdate: (updatedTickets: TicketData[]) => void;
}

export default function TicketsTable({ tickets, onUpdate }: TicketsTableProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const STORAGE_KEY = "ticketsTable";
  const EXPIRATION_HOURS = 24;

  // 🔹 Cargar tickets desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as {
          tickets: TicketData[];
          timestamp: number;
        };

        // Verificar si han pasado más de 24 horas
        const now = Date.now();
        const diffHours = (now - parsed.timestamp) / (1000 * 60 * 60);

        if (diffHours < EXPIRATION_HOURS) {
          if (parsed.tickets.length > 0) {
            onUpdate(parsed.tickets); // sincroniza con el padre
          }
        } else {
          localStorage.removeItem(STORAGE_KEY); // Expiró → limpiar
        }
      } catch (e) {
        console.error("Error al parsear tickets de localStorage", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔹 Guardar tickets en localStorage cuando cambian
  useEffect(() => {
    if (tickets.length > 0) {
      const data = {
        tickets,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } else {
      localStorage.removeItem(STORAGE_KEY); // limpiar si está vacío
    }
  }, [tickets]);

  // Función para obtener la fecha y hora actual en dd/mm/aa hh:mm:ss
  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleDelete = (index: number) => {
    const newTickets = tickets.filter((_, i) => i !== index);
    onUpdate(newTickets);
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
    const dateTime = getCurrentDateTime();
    const allTickets = [dateTime, ...tickets.map((t) => t.ticket)].join("\n");
    navigator.clipboard.writeText(allTickets);
  };

  const handleExport = () => {
    const dateTime = getCurrentDateTime();
    const content = [dateTime, ...tickets.map((t) => t.ticket)].join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tickets_${dateTime.replace(/[/: ]/g, "-")}.txt`; // nombre con fecha y hora
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = (ticket: string) => {
    navigator.clipboard.writeText(ticket);
  };

  const handleClearAll = () => {
    if (confirm("¿Estás seguro que quieres limpiar todos los tickets?")) {
      onUpdate([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Botones de acciones */}
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

      {/* Tabla de tickets */}
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
                    onChange={(e) =>
                      setEditValue(e.target.value.replace(/[^0-9-]/g, ""))
                    }
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
