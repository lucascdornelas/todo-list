import { Check, Undo2, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import { Task } from "../types";

type TaskItemProps = {
  task: Task;
  toggleTaskCompletion: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
};

export default function TaskItem(props: TaskItemProps) {
  const { task, toggleTaskCompletion, removeTask, editTask } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleSaveEdit = () => {
    if (editedText.trim() !== "") {
      editTask(task.id, editedText.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedText(task.text);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    if (isEditing) handleSaveEdit();
    else setIsEditing(true);
  }

  return (
    <li
      className={`flex items-center justify-between p-4 rounded-lg border shadow-sm bg-white dark:bg-gray-800 transition
         ${
        task.completed ? "border-green-500" : "border-gray-300"
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSaveEdit(); 
            if (e.key === "Escape") handleCancelEdit();
          }}
          onBlur={handleSaveEdit}
          className="flex-1 px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-gray-800 dark:border-gray-400 dark:focus:ring-gray-400 dark:text-gray-300"
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-1 text-sm cursor-pointer ${
            task.completed ? "line-through text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-300"
          }`}
        >
          {task.text}
        </span>
      )}

      <button
        onClick={() => toggleTaskCompletion(task.id)}
        className={`ml-3 flex items-center justify-center w-10 h-10 rounded-lg border transition ${
          task.completed
            ? "border-yellow-500 text-yellow-500 hover:bg-yellow-100 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900"
            : "border-green-500 text-green-500 hover:bg-green-100 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900"
        }`}
        aria-label="Alternar Completude da Tarefa"
      >
        {task.completed ? <Undo2 size={20} /> : <Check size={20} />}
      </button>

      <button
        onClick={toggleEdit}
        className="ml-3 flex items-center justify-center w-10 h-10 rounded-lg border border-gray-500 text-gray-500 hover:bg-gray-100 transition dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-900"
        aria-label="Editar Tarefa"
      >
        <Edit2 size={20} />
      </button>

      <button
        onClick={() => removeTask(task.id)}
        className="ml-3 flex items-center justify-center w-10 h-10 rounded-lg border border-red-500 text-red-500 hover:bg-red-100 transition dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900"
        aria-label="Remover Tarefa"
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
}
