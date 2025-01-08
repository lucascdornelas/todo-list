import { Check, Undo2, Trash2 } from "lucide-react";

type TaskItemProps = {
  task: { text: string; completed: boolean };
  index: number;
  toggleTaskCompletion: (index: number) => void;
  removeTask: (index: number) => void;
};

export default function TaskItem(props: TaskItemProps) {
  const { task, index, toggleTaskCompletion, removeTask } = props;

  return (
    <li
      className={`flex items-center justify-between p-4 rounded-lg border ${
        task.completed ? "bg-gray-100 text-white" : ""
      }`}
    >
      <span
        className={`flex-1 text-sm ${
          task.completed ? "line-through text-gray-700" : "text-gray-800"
        }`}
      >
        {task.text}
      </span>

      <button
        onClick={() => toggleTaskCompletion(index)}
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition ${
          task.completed
            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
            : "bg-localiza-green hover:bg-localiza-green-dark text-white"
        }`}
        aria-label="Alternar Completude da Tarefa"
      >
        {task.completed ? <Undo2 size={20} /> : <Check size={20} />}
      </button>

      <button
        onClick={() => removeTask(index)}
        className="ml-3 flex items-center justify-center w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
        aria-label="Remover Tarefa"
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
}
