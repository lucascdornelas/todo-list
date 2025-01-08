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
        <h1 className="text-2xl font-bold mb-4 text-center text-localiza-green">
          Lista de Tarefas
        </h1>

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
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
