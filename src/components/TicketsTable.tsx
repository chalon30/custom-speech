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

  const [revisionRows, setRevisionRows] = useState<boolean[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as {
          tickets: TicketData[];
          timestamp: number;
        };

        const now = Date.now();
        const diffHours = (now - parsed.timestamp) / (1000 * 60 * 60);

        if (diffHours < EXPIRATION_HOURS) {
          if (parsed.tickets.length > 0) {
            onUpdate(parsed.tickets);
            setRevisionRows(parsed.tickets.map(() => false));
          }
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        console.error("Error al parsear tickets de localStorage", e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (tickets.length > 0) {
      const data = {
        tickets,
        timestamp: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setRevisionRows(tickets.map((_, i) => revisionRows[i] || false));
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setRevisionRows([]);
    }
  }, [tickets]);

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
    setRevisionRows(revisionRows.filter((_, i) => i !== index));
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

  const handleCopy = (ticket: string) => {
    navigator.clipboard.writeText(ticket);
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
    a.download = `tickets_${dateTime.replace(/[/: ]/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    if (confirm("¿Estás seguro que quieres limpiar todos los tickets?")) {
      onUpdate([]);
      localStorage.removeItem(STORAGE_KEY);
      setRevisionRows([]);
    }
  };

  const toggleRevision = (index: number) => {
    const newRevisions = [...revisionRows];
    newRevisions[index] = !newRevisions[index];
    setRevisionRows(newRevisions);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Botones de acciones */}
      <div className="flex justify-end gap-2 mb-2 flex-wrap">
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
          Limpiar Tabla
        </button>
      </div>

      {/* Tabla de tickets */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-3 py-1 text-left text-sm">Ticket</th>
            <th className="border border-gray-300 px-3 py-1 text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t, i) => (
            <tr key={i} className={revisionRows[i] ? "bg-yellow-100" : ""}>
              <td className="border border-gray-300 px-3 py-1 text-sm">
                {editingIndex === i ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) =>
                      setEditValue(e.target.value.replace(/[^0-9-]/g, ""))
                    }
                    className="w-full px-1 py-0.5 border border-gray-300 rounded text-sm"
                  />
                ) : (
                  t.ticket
                )}
              </td>
              <td className="border border-gray-300 px-3 py-1 flex gap-1 flex-wrap">
                {editingIndex === i ? (
                  <button
                    onClick={() => handleSave(i)}
                    className="px-1 py-0.5 text-sm bg-green-500 text-white rounded hover:bg-green-400 transition-colors"
                  >
                    Guardar
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(i)}
                      className="px-1 py-0.5 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-400 transition-colors"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(i)}
                      className="px-1 py-0.5 text-sm bg-red-500 text-white rounded hover:bg-red-400 transition-colors"
                    >
                      Eliminar
                    </button>

                    <button
                      onClick={() => toggleRevision(i)}
                      className={`px-1 py-0.5 text-sm rounded transition-colors ${
                        revisionRows[i]
                          ? "bg-green-500 text-white hover:bg-green-400"
                          : "bg-green-400 text-white hover:bg-green-300"
                      }`}
                    >
                      Revisar
                    </button>

                    <button
                      onClick={() => handleCopy(t.ticket)}
                      className="px-1 py-0.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-400 transition-colors"
                    >
                      Copiar
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
