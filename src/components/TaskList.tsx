import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useTaskStore from "../store/taskStore";
import Button from "./ui/Button";
import { FormattedMessage, useIntl } from "react-intl";

type TaskListProps = {
  tasksPerPage?: number;
};

export default function TaskList(props: TaskListProps) {
  const { tasksPerPage = 5 } = props;

  const { formatMessage } = useIntl();

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
            <FormattedMessage id="app.task.list.noTasksFound" />
          </li>
        )}
      </ul>

      <div className="flex items-center justify-center mt-4 space-x-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label={formatMessage({ id: "app.task.list.previousPage" })}
        >
          <ChevronLeft size={16} />
        </Button>
        <span className="px-3 py-1 text-gray-700 dark:text-gray-300">
          {formatMessage({ id: "app.task.list.page" }, { currentPage, totalPages })}
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label={formatMessage({ id: "app.task.list.nextPage" })}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
