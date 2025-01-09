import AddTask from "./components/AddTask";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import BatchActionsBar from "./components/BatchActionsBar";

export function App() {
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
        <AddTask />
        <FilterBar />
        <TaskList />
        <BatchActionsBar />
      </div>
    </div>
  );
}
