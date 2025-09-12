"use client";
import DarkModeButton from "./buttons/DarkModeButton";

export default function Header() {
  return (
    <header className="bg-orange-500 text-white shadow-lg sticky top-0 z-50 select-none">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Marca */}
        <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-wide select-none">
          Custom{" "}
          <span style={{ color: "#353535ff" }} className="drop-shadow-md">
            Speech
          </span>
        </h1>

        {/* Acciones */}
        <div className="flex items-center gap-4 select-none">
          <DarkModeButton />
        </div>
      </div>
    </header>
  );
}
