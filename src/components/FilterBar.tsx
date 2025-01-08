import React from "react";

interface FilterBarProps {
  filter: string;
  setFilter: (filter: string) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

export default function FilterBar({
  filter,
  setFilter,
  searchText,
  setSearchText,
}: FilterBarProps) {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <button
        onClick={() => setFilter("all")}
        className={`px-4 py-2 rounded-lg transition ${
          filter === "all"
            ? "bg-localiza-green hover:bg-localiza-green-dark text-white"
            : "border border-gray-300 text-gray-700"
        }`}
      >
        Todas
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`px-4 py-2 rounded-lg transition ${
          filter === "active"
            ? "bg-localiza-green hover:bg-localiza-green-dark text-white"
            : "border border-gray-300 text-gray-700"
        }`}
      >
        Ativas
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`px-4 py-2 rounded-lg transition ${
          filter === "completed"
            ? "bg-localiza-green hover:bg-localiza-green-dark text-white"
            : "border border-gray-300 text-gray-700"
        }`}
      >
        Completas
      </button>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Buscar tarefa"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
