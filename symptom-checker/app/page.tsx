"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-200 text-gray-800"
      }`}
    >
      {/* Theme toggle button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        <Icon
          icon={darkMode ? "mdi:weather-sunny" : "mdi:weather-night"}
          className="h-6 w-6 text-yellow-500 dark:text-yellow-400"
        />
      </button>

      <h1 className="text-4xl font-bold mb-6">
        Welcome to Symptom Checker
      </h1>
      <p className="text-lg mb-8 text-center max-w-xl">
        This simple chatbot helps you describe your symptoms and get quick
        guidance. Remember: it’s not a replacement for medical advice. Always
        consult a doctor.
      </p>

      <Link
        href="/chatbot"
        className={`px-6 py-3 rounded-xl shadow-md transition ${
          darkMode
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Start Symptom Checker
      </Link>
    </main>
  );
}
