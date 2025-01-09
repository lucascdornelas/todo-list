import React, { useState } from "react";
import useTaskStore from "../store/taskStore";

export default function AddTask() {
  const addTask = useTaskStore((state) => state.addTask);

  const [text, setText] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mb-4 pb-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite uma nova tarefa"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
      />
      <button
        type="submit"
        className="w-full bg-localiza-green text-white py-2 rounded-lg hover:bg-localiza-green-dark transition"
      >
        Adicionar Tarefa
      </button>
    </form>
  );
}
