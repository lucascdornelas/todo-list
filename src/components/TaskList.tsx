import TaskItem from "./TaskItem";

type TaskListProps = {
  tasks: { text: string; completed: boolean }[];
  filterText: string;
  filter: string;
  removeTask: (index: number) => void;
  toggleTaskCompletion: (index: number) => void;
  editTask: (index: number, newText: string) => void;
};

export default function TaskList(props: TaskListProps) {
  const {
    tasks,
    filterText,
    filter,
    removeTask,
    toggleTaskCompletion,
    editTask,
  } = props;
  return (
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
  );
}
