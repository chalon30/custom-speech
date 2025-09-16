"use client";

import { useGreeting } from "@/context/GreetingContext";

export default function GreetingSelector() {
  const { saludo, setSaludo } = useGreeting();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSaludo(e.target.value);
  };

  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="saludo" className="text-sm font-medium">
        Selecciona saludo:
      </label>
      <select
        id="saludo"
        value={saludo}
        onChange={handleChange}
        className="px-2 py-1 border rounded-md"
      >
        <option value="Estimado">Estimado</option>
        <option value="Estimada">Estimada</option>
        <option value="Estimados">Estimados</option>
      </select>
    </div>
  );
}
