import React, { useState } from "react";
import useTaskStore from "../store/taskStore";
import Button from "./ui/Button";
import Input from "./ui/Input";

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
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite uma nova tarefa"
        className="w-full"
      />
      <Button type="submit" className="w-full">
        Adicionar Tarefa
      </Button>
    </form>
  );
}
