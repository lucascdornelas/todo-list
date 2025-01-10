import useTaskStore from "../store/taskStore";
import Button from "./ui/Button";

export default function BatchActionsBar() {
  const deleteAllTasks = useTaskStore((state) => state.deleteAllTasks);
  const markAllCompleted = useTaskStore((state) => state.markAllCompleted);

  return (
    <div className="flex justify-start mt-4 space-x-2">
      <Button onClick={markAllCompleted}>Marcar Todas como Completas</Button>
      <Button onClick={deleteAllTasks} variant="destructive">
        Excluir Todas
      </Button>
    </div>
  );
}
