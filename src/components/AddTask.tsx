import React, { useState } from "react";
import useTaskStore from "../store/taskStore";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { FormattedMessage, useIntl } from "react-intl";

export default function AddTask() {
  const addTask = useTaskStore((state) => state.addTask);

  const { formatMessage } = useIntl();

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
        placeholder={formatMessage({ id: "app.task.add.placeholder" })}
        className="w-full"
      />
      <Button type="submit" className="w-full">
        <FormattedMessage id="app.task.add" />
      </Button>
    </form>
  );
}
