type BatchActionsBarProps = {
  markAllCompleted: () => void;
  deleteAllTasks: () => void;
};

export default function BatchActionsBar({
  markAllCompleted,
  deleteAllTasks,
}: BatchActionsBarProps) {
  return (
    <div className="flex justify-start mt-4 space-x-2">
      <button
        onClick={markAllCompleted}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
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
