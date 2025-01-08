import { Check, Undo2, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";

type TaskItemProps = {
  task: { text: string; completed: boolean };
  index: number;
  toggleTaskCompletion: (index: number) => void;
  removeTask: (index: number) => void;
  editTask: (index: number, newText: string) => void;
};

export default function TaskItem(props: TaskItemProps) {
  const { task, index, toggleTaskCompletion, removeTask, editTask } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleSaveEdit = () => {
    if (editedText.trim() !== "") {
      editTask(index, editedText.trim());
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
      className={`flex items-center justify-between p-4 rounded-lg border shadow-sm ${
        task.completed ? "border-green-500 bg-white" : "border-gray-300 bg-white"
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
          className="flex-1 px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500"
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-1 text-sm cursor-pointer ${
            task.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {task.text}
        </span>
      )}

      <button
        onClick={() => toggleTaskCompletion(index)}
        className={`ml-3 flex items-center justify-center w-10 h-10 rounded-lg border transition ${
          task.completed
            ? "border-yellow-500 text-yellow-500 hover:bg-yellow-100"
            : "border-green-500 text-green-500 hover:bg-green-100"
        }`}
        aria-label="Alternar Completude da Tarefa"
      >
        {task.completed ? <Undo2 size={20} /> : <Check size={20} />}
      </button>

      <button
        onClick={toggleEdit}
        className="ml-3 flex items-center justify-center w-10 h-10 rounded-lg border border-gray-500 text-gray-500 hover:bg-gray-100 transition"
        aria-label="Editar Tarefa"
      >
        <Edit2 size={20} />
      </button>

      <button
        onClick={() => removeTask(index)}
        className="ml-3 flex items-center justify-center w-10 h-10 rounded-lg border border-red-500 text-red-500 hover:bg-red-100 transition"
        aria-label="Remover Tarefa"
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
}
