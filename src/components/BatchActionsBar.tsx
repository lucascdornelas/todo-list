import useTaskStore from "../store/taskStore";

export default function BatchActionsBar() {
  const deleteAllTasks = useTaskStore((state) => state.deleteAllTasks);
  const markAllCompleted = useTaskStore((state) => state.markAllCompleted);

  return (
    <div className="flex justify-start mt-4 space-x-2">
      <button
        onClick={markAllCompleted}
        className="px-4 py-2 bg-localiza-green text-white rounded-lg hover:bg-localiza-green-dark transition"
      >
        Marcar Todas como Completas
      </button>
      <button
        onClick={deleteAllTasks}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Excluir Todas
      </button>
    </div>
  );
}
