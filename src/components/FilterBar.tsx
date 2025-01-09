import useTaskStore from "../store/taskStore";

export default function FilterBar() {
  const filterText = useTaskStore((state) => state.filterText);
  const setFilterText = useTaskStore((state) => state.setFilterText);
  const filter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);

  return (
    <div className="flex items-center space-x-2 mb-4">
      <button
        onClick={() => setFilter("all")}
        className={`px-4 py-2 rounded-lg transition ${
          filter === "all"
            ? "border border-localiza-green bg-localiza-green hover:bg-localiza-green-dark text-white"
            : "border border-gray-300 text-gray-700 dark:text-gray-300"
        }`}
      >
        Todas
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`px-4 py-2 rounded-lg transition ${
          filter === "active"
            ? "border border-localiza-green bg-localiza-green hover:bg-localiza-green-dark text-white"
            : "border border-gray-300 text-gray-700 dark:text-gray-300"
        }`}
      >
        Ativas
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`px-4 py-2 rounded-lg transition ${
          filter === "completed"
            ? "border border-localiza-green bg-localiza-green hover:bg-localiza-green-dark text-white"
            : "border border-gray-300 text-gray-700 dark:text-gray-300"
        }`}
      >
        Completas
      </button>
      <input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Buscar tarefa"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
      />
    </div>
  );
}
