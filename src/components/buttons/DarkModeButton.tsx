"use client";

import { useState, useEffect } from "react";

export default function DarkModeButton() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.style.setProperty("--background", "#353535ff");
      document.documentElement.style.setProperty("--foreground", "#ededed");
    } else {
      document.documentElement.style.setProperty("--background", "#ffffff");
      document.documentElement.style.setProperty("--foreground", "#353535ff");
    }
  }, [darkMode]);

  return (
    <div
      onClick={() => setDarkMode(!darkMode)}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors select-none ${
        darkMode ? "bg-gray-700" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center select-none ${
          darkMode
            ? "translate-x-6 bg-yellow-400 text-black"
            : "translate-x-0 bg-gray-800 text-white"
        }`}
      >
        {darkMode ? "☀️" : "🌙"}
      </div>
    </div>
  );
}
