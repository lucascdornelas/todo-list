import useTaskStore from "../store/taskStore";
import Button from "./ui/Button";

export default function FilterBar() {
  const filterText = useTaskStore((state) => state.filterText);
  const setFilterText = useTaskStore((state) => state.setFilterText);
  const filter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);

  return (
    <div className="flex items-center space-x-2 mb-4">
      <Button
        onClick={() => setFilter("all")}
        variant={filter === "all" ? "primary" : "secondary"}
      >
        Todas
      </Button>
      <Button
        onClick={() => setFilter("active")}
        variant={filter === "active" ? "primary" : "secondary"}
      >
        Ativas
      </Button>
      <Button
        onClick={() => setFilter("completed")}
        variant={filter === "completed" ? "primary" : "secondary"}
      >
        Completas
      </Button>
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
