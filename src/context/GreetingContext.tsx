"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface GreetingContextType {
  saludo: string;
  setSaludo: (value: string) => void;
}

const GreetingContext = createContext<GreetingContextType | undefined>(undefined);

export const GreetingProvider = ({ children }: { children: ReactNode }) => {
  const [saludo, setSaludo] = useState("Estimados");

  return (
    <GreetingContext.Provider value={{ saludo, setSaludo }}>
      {children}
    </GreetingContext.Provider>
  );
};

// Hook para usar el contexto en cualquier parte
export const useGreeting = () => {
  const context = useContext(GreetingContext);
  if (!context) {
    throw new Error("useGreeting debe usarse dentro de un GreetingProvider");
  }
  return context;
};
