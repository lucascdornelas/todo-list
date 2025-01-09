import { useState } from "react";
import AddTask from "./components/AddTask";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import { Task } from "./types";

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterText, setFilterText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = (newTask: string) => {
    const newTaskObj = {
      id: tasks.length,
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
  };

  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const editTask = (id: number, newText: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
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

        <TaskList
          tasks={tasks}
          filterText={filterText}
          filter={filter}
          removeTask={removeTask}
          toggleTaskCompletion={toggleTaskCompletion}
          editTask={editTask}
        />
      </div>
    </div>
  );
}
