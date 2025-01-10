import { Check, Undo2, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import { Task } from "../types";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useIntl } from "react-intl";

type TaskItemProps = {
  task: Task;
  toggleTaskCompletion: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
};

export default function TaskItem(props: TaskItemProps) {
  const { task, toggleTaskCompletion, removeTask, editTask } = props;
  const { formatMessage } = useIntl();

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
  };

  return (
    <li
      className={`flex items-center justify-between p-4 rounded-lg border shadow-sm bg-white dark:bg-gray-800 transition
         ${task.completed ? "border-green-500" : "border-gray-300"}`}
    >
      {isEditing ? (
        <Input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSaveEdit();
            if (e.key === "Escape") handleCancelEdit();
          }}
          onBlur={handleSaveEdit}
          className="flex-1 border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-gray-800 dark:border-gray-400 dark:focus:ring-gray-400 dark:text-gray-300"
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-1 text-sm cursor-pointer ${
            task.completed
              ? "line-through text-gray-500 dark:text-gray-400"
              : "text-gray-800 dark:text-gray-300"
          }`}
        >
          {task.text}
        </span>
      )}

      <Button
        onClick={() => toggleTaskCompletion(task.id)}
        className={"ml-3 flex items-center justify-center w-10 h-10"}
        variant="success"
        size="icon"
        aria-label={formatMessage({
          id: task.completed
            ? "app.task.item.uncomplete"
            : "app.task.item.complete",
        })}
      >
        {task.completed ? <Undo2 size={20} /> : <Check size={20} />}
      </Button>

      <Button
        onClick={toggleEdit}
        className="ml-3 flex items-center justify-center w-10 h-10"
        variant="neutral"
        size="icon"
        aria-label={formatMessage({ id: "app.task.item.edit" })}
      >
        <Edit2 size={20} />
      </Button>

      <Button
        onClick={() => removeTask(task.id)}
        className="ml-3 flex items-center justify-center w-10 h-10 rounded-lg border"
        variant="warning"
        size="icon"
        aria-label={formatMessage({ id: "app.task.item.remove" })}
      >
        <Trash2 size={20} />
      </Button>
    </li>
  );
}
