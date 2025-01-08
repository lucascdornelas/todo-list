import { useState } from "react";

export function App() {
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filterText, setFilterText] = useState("");

  const addTask = () => {
    const newTaskObj = {
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-localiza-green">Lista de Tarefas</h1>

        <div className="mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Digite uma nova tarefa"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <button
            onClick={addTask}
            className="w-full bg-localiza-green text-white py-2 rounded-lg hover:bg-localiza-green-dark transition"
          >
            Adicionar Tarefa
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Filtrar por texto"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <ul className="space-y-2">
          {tasks
            .filter((task) =>
              task.text.toLowerCase().includes(filterText.toLowerCase())
            )
            .map((task, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  task.completed ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => editTask(index, e.target.value)}
                  className="flex-1 px-2 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 mr-2"
                />
                <button
                  onClick={() => toggleTaskCompletion(index)}
                  className={`px-4 py-2 rounded-lg text-white transition ${
                    task.completed
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {task.completed ? "Desmarcar" : "Concluir"}
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Remover
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
