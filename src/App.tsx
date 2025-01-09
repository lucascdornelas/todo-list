import AddTask from "./components/AddTask";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import BatchActionsBar from "./components/BatchActionsBar";
import useTaskStore from "./store/taskStore";

export function App() {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const toggleTaskCompletion = useTaskStore((state) => state.toggleTaskCompletion);
  const editTask = useTaskStore((state) => state.editTask);
  const deleteAllTasks = useTaskStore((state) => state.deleteAllTasks);
  const markAllCompleted = useTaskStore((state) => state.markAllCompleted);

  const filterText = useTaskStore((state) => state.filterText);
  const setFilterText = useTaskStore((state) => state.setFilterText);
  const filter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);

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

        <BatchActionsBar
          deleteAllTasks={deleteAllTasks}
          markAllCompleted={markAllCompleted}
        />
      </div>
    </div>
  );
}
