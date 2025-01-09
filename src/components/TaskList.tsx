import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useTaskStore from "../store/taskStore";

type TaskListProps = {
  tasksPerPage?: number;
};

export default function TaskList(props: TaskListProps) {
  const {
    tasksPerPage = 5,
  } = props;

  const tasks = useTaskStore((state) => state.tasks);
  const removeTask = useTaskStore((state) => state.removeTask);
  const toggleTaskCompletion = useTaskStore(
    (state) => state.toggleTaskCompletion
  );
  const editTask = useTaskStore((state) => state.editTask);

  const filterText = useTaskStore((state) => state.filterText);
  const filter = useTaskStore((state) => state.filter);

  const [currentPage, setCurrentPage] = useState(1);

  const filteredTasks = tasks
    .filter((task) =>
      task.text.toLowerCase().includes(filterText.toLowerCase())
    )
    .filter((task) =>
      filter === "all"
        ? true
        : filter === "active"
        ? !task.completed
        : task.completed
    );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredTasks.length, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage
  );

  const changePage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <ul className="space-y-2 h-[420px] overflow-y-auto border border-gray-300 rounded-lg p-2">
        {currentTasks.length > 0 ? (
          currentTasks.map((task) => (
            <TaskItem
              key={task.id}
              removeTask={removeTask}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              editTask={editTask}
            />
          ))
        ) : (
          <li className="text-center text-gray-500 py-4">
            Nenhuma tarefa encontrada.
          </li>
        )}
      </ul>

      <div className="flex items-center justify-center mt-4 space-x-2">
        <button
          onClick={() => changePage(currentPage - 1)}
          className={`px-3 py-1 rounded-lg border ${
            currentPage === 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-gray-700 border-gray-400 hover:bg-gray-100"
          }`}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>
        <span className="px-3 py-1 text-gray-700">{`${currentPage} de ${totalPages}`}</span>
        <button
          onClick={() => changePage(currentPage + 1)}
          className={`px-3 py-1 rounded-lg border ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-gray-700 border-gray-400 hover:bg-gray-100"
          }`}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
