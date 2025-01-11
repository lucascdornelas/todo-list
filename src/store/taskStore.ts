import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Task } from "../types";

type TaskStore = {
  tasks: Task[];
  filterText: string;
  filter: "all" | "active" | "completed";
  addTask: (newTask: string) => void;
  removeTask: (id: number) => void;
  toggleTaskCompletion: (id: number) => void;
  editTask: (id: number, newText: string) => void;
  deleteAllTasks: () => void;
  markAllCompleted: () => void;
  setFilterText: (filterText: string) => void;
  setFilter: (filter: "all" | "active" | "completed") => void;
  reorderTasks: (sourceId: number, targetId: number) => void;
};

const useTaskStore = create(
  devtools(persist<TaskStore>(
    (set) => ({
      tasks: [] as Task[],
      filterText: "",
      filter: "all",
      addTask: (newTask: string) =>
        set((state: { tasks: Task[] }) => ({
          tasks: [
            ...state.tasks,
            {
              id: state.tasks.length,
              text: newTask,
              completed: false,
            },
          ],
        })),
      removeTask: (id: number) =>
        set((state: { tasks: Task[] }) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTaskCompletion: (id: number) =>
        set((state: { tasks: Task[] }) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      editTask: (id: number, newText: string) =>
        set((state: { tasks: Task[] }) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, text: newText } : task
          ),
        })),
      deleteAllTasks: () => set({ tasks: [] }),
      markAllCompleted: () =>
        set((state: { tasks: Task[] }) => ({
          tasks: state.tasks.map((task) => ({ ...task, completed: true })),
        })),
      setFilterText: (filterText: string) => set({ filterText }),
      setFilter: (filter: "all" | "active" | "completed") => set({ filter }),
      reorderTasks: (sourceId: number, targetId: number) =>
        set((state: { tasks: Task[] }) => {
          const newTasks = [...state.tasks];
          const sourceIndex = newTasks.findIndex((task) => task.id === sourceId);
          const targetIndex = newTasks.findIndex((task) => task.id === targetId);

          if (sourceIndex === -1 || targetIndex === -1) {
            return { tasks: newTasks };
          }

          const [movedTask] = newTasks.splice(sourceIndex, 1);
          newTasks.splice(targetIndex, 0, movedTask);

          const updatedTasks = newTasks.map((task, index) => ({ ...task, id: index }));

          return {
            tasks: updatedTasks,
          };
        }),
    }),
    {
      name: "task-store",
    }
  ))
);

export default useTaskStore;
