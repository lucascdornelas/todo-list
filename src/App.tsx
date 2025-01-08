import { useState } from "react";
import AddTask from "./components/AddTask";
import FilterBar from "./components/FilterBar";
import TaskItem from "./components/TaskItem";

export function App() {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>(
    []
  );
  const [filterText, setFilterText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = (newTask: string) => {
    const newTaskObj = {
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index: number, newText: string) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Lista de Tarefas
          </h1>
          <p className="text-sm text-gray-500">
            Organize e gerencie suas tarefas diárias
          </p>
        </div>

        <AddTask onAdd={addTask} />

        <FilterBar
          searchText={filterText}
          setSearchText={setFilterText}
          filter={filter}
          setFilter={setFilter}
        />

        <ul className="space-y-2">
          {tasks
            .filter((task) =>
              task.text.toLowerCase().includes(filterText.toLowerCase())
            )
            .filter((task) =>
              filter === "all"
                ? true
                : filter === "active"
                ? !task.completed
                : task.completed
            )
            .map((task, index) => (
              <TaskItem
                key={index}
                index={index}
                removeTask={removeTask}
                task={task}
                toggleTaskCompletion={toggleTaskCompletion}
                editTask={editTask}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
