"use client";

import { useState, useRef } from "react";

export interface TicketData {
  ticket: string;       // El número de ticket
  ot?: string;          // OT individual (si solo hay una)
  ots?: string[];       // OTs múltiples (si quieres varias)
  info?: string;        // Información adicional (ej: torre, descripción)
  qas?: string;         // Campo para QAS
  qa2?: string;         // Campo para QA2
}

interface TicketBoxProps {
  selected?: string; // para saber si estamos en Transportes
  placeholder?: string;
  infoPlaceholder?: string;
  onChange?: (values: TicketData[]) => void;
}

export default function TicketBox({
  selected,
  placeholder = "Ingrese su ticket",
  infoPlaceholder = "Nombre de la Torre",
  onChange,
}: TicketBoxProps) {
  const [tickets, setTickets] = useState<TicketData[]>([
    { ticket: "", info: "", ot: "", qas: "", qa2: "" },
  ]);
  const [duplicateIndex, setDuplicateIndex] = useState<number | null>(null);

  // Refs
  const ticketRefs = useRef<Array<HTMLInputElement | null>>([]);
  const infoRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otRefs = useRef<Array<HTMLInputElement | null>>([]);
  const qasRefs = useRef<Array<HTMLInputElement | null>>([]);
  const qa2Refs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    index: number,
    field: "ticket" | "info" | "ot" | "qas" | "qa2",
    value: string
  ) => {
    const newTickets = [...tickets];

    if (field === "ticket") {
      const sanitized = value.replace(/[^0-9-]/g, "");
      newTickets[index][field] = sanitized;

      const isDuplicate =
        sanitized !== "" &&
        newTickets.some((t, i) => i !== index && t.ticket === sanitized);
      setDuplicateIndex(isDuplicate ? index : null);
    } else {
      newTickets[index][field] = value;
    }

    setTickets(newTickets);
    if (onChange) onChange(newTickets);
  };

  const handleAdd = () =>
    setTickets([...tickets, { ticket: "", info: "", ot: "", qas: "", qa2: "" }]);

  const handleRemove = (index: number) => {
    if (tickets.length === 1) return;
    const newTickets = tickets.filter((_, i) => i !== index);
    setTickets(newTickets);
    if (onChange) onChange(newTickets);

    if (duplicateIndex === index) setDuplicateIndex(null);
  };

  const handleTabTicket = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();

      const nextTicket = tickets.findIndex(
        (t, i) => i > index && t.ticket.trim() === ""
      );
      if (nextTicket !== -1) {
        ticketRefs.current[nextTicket]?.focus();
      } else {
        const nextInfo = tickets.findIndex(
          (t) => t.info?.trim() === "" || t.info === undefined
        );
        if (nextInfo !== -1) {
          infoRefs.current[nextInfo]?.focus();
        } else if (selected === "TRANSPORTES") {
          const nextOt = tickets.findIndex(
            (t) => t.ot?.trim() === "" || t.ot === undefined
          );
          if (nextOt !== -1) {
            otRefs.current[nextOt]?.focus();
          } else {
            handleAdd();
            setTimeout(() => ticketRefs.current[tickets.length]?.focus(), 0);
          }
        } else {
          handleAdd();
          setTimeout(() => ticketRefs.current[tickets.length]?.focus(), 0);
        }
      }
    }
  };

  const handleTabInfo = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();

      const nextInfo = tickets.findIndex(
        (t, i) => i > index && (t.info?.trim() === "" || t.info === undefined)
      );
      if (nextInfo !== -1) {
        infoRefs.current[nextInfo]?.focus();
      } else if (selected === "TRANSPORTES") {
        const nextOt = tickets.findIndex(
          (t) => t.ot?.trim() === "" || t.ot === undefined
        );
        if (nextOt !== -1) {
          otRefs.current[nextOt]?.focus();
        } else {
          handleAdd();
          setTimeout(() => ticketRefs.current[tickets.length]?.focus(), 0);
        }
      } else {
        handleAdd();
        setTimeout(() => ticketRefs.current[tickets.length]?.focus(), 0);
      }
    }
  };

  const handleTabOt = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      qasRefs.current[index]?.focus();
    }
  };

  const handleTabQas = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      qa2Refs.current[index]?.focus();
    }
  };

  const handleTabQa2 = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
      setTimeout(() => ticketRefs.current[tickets.length]?.focus(), 0);
    }
  };

  const handleClearAll = () => {
    setTickets([{ ticket: "", info: "", ot: "", qas: "", qa2: "" }]);
    setDuplicateIndex(null);
    setTimeout(() => ticketRefs.current[0]?.focus(), 0);
    if (onChange) onChange([{ ticket: "", info: "", ot: "", qas: "", qa2: "" }]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-4 space-y-2 relative">
      {/* Barra superior del componente */}
      <div className="flex justify-end mb-4 p-2">
        <button
          type="button"
          onClick={handleClearAll}
          className="px-2 py-1 bg-red-400 text-white rounded-md hover:bg-yellow-400 transition-colors"
        >
          Limpiar los campos
        </button>
      </div>

      {tickets.map((t, index) => (
        <div key={index} className="flex flex-col gap-1">
          <div className="flex flex-wrap gap-2 items-center">
            {/* Input de ticket */}
            <input
              type="text"
              value={t.ticket}
              onChange={(e) => handleChange(index, "ticket", e.target.value)}
              onKeyDown={(e) => handleTabTicket(index, e)}
              placeholder={`${placeholder} ${index + 1}`}
              ref={(el) => {
                ticketRefs.current[index] = el;
              }}
              className={`
    flex-[2] max-w-[160px] px-2 py-2 border rounded-lg
    ${duplicateIndex === index ? "border-red-500" : "border-gray-300"}
    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
    transition-all duration-200 placeholder-gray-400
  `}
            />

            {/* Input de info */}
            {tickets.length > 1 && selected !== "TRANSPORTES" && (
              <input
                type="text"
                value={t.info || ""}
                onChange={(e) => handleChange(index, "info", e.target.value)}
                onKeyDown={(e) => handleTabInfo(index, e)}
                placeholder={infoPlaceholder}
                ref={(el) => {
                  infoRefs.current[index] = el;
                }}
                className="
      flex-[3] max-w-[180px] px-2 py-2 border border-gray-300 rounded-lg
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      transition-all duration-200 placeholder-gray-400
    "
              />
            )}

            {/* NUEVO input OT solo para Transportes */}
            {selected === "TRANSPORTES" && (
              <>
                <input
                  type="text"
                  value={t.ot || ""}
                  onChange={(e) => handleChange(index, "ot", e.target.value)}
                  onKeyDown={(e) => handleTabOt(index, e)}
                  placeholder="OT"
                  ref={(el) => {
                    otRefs.current[index] = el;
                  }}
                  className="
      flex-[2] max-w-[120px] px-2 py-2 border border-gray-300 rounded-lg
      focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
      transition-all duration-200 placeholder-gray-400
    "
                />

                {/* Input QAS */}
                <input
                  type="text"
                  value={t.qas || ""}
                  onChange={(e) => handleChange(index, "qas", e.target.value)}
                  onKeyDown={(e) => handleTabQas(index, e)}
                  placeholder="QAS"
                  ref={(el) => {
                    qasRefs.current[index] = el;
                  }}
                  className="
      flex-[2] max-w-[120px] px-2 py-2 border border-gray-300 rounded-lg
      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
      transition-all duration-200 placeholder-gray-400
    "
                />

                {/* Input QA2 */}
                <input
                  type="text"
                  value={t.qa2 || ""}
                  onChange={(e) => handleChange(index, "qa2", e.target.value)}
                  onKeyDown={(e) => handleTabQa2(index, e)}
                  placeholder="QA2"
                  ref={(el) => {
                    qa2Refs.current[index] = el;
                  }}
                  className="
      flex-[2] max-w-[120px] px-2 py-2 border border-gray-300 rounded-lg
      focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500
      transition-all duration-200 placeholder-gray-400
    "
                />
              </>
            )}

            {/* Botones + y - */}
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

          {duplicateIndex === index && (
            <p className="text-red-500 text-sm">
              Este ticket se repite, solo ten en cuenta que ya existe.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
