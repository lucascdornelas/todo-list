import useTaskStore from "../store/taskStore";
import Button from "./ui/Button";
import Input from "./ui/Input";

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
      <Input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder="Buscar tarefa"
        className="w-full"
      />
    </div>
  );
}
