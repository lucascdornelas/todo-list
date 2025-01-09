import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "../types";

type TaskStore = {
  tasks: Task[];
  filterText: string;
  filter: string;
  addTask: (newTask: string) => void;
  removeTask: (id: number) => void;
  toggleTaskCompletion: (id: number) => void;
  editTask: (id: number, newText: string) => void;
  deleteAllTasks: () => void;
  markAllCompleted: () => void;
  setFilterText: (filterText: string) => void;
  setFilter: (filter: string) => void;
};

const useTaskStore = create(
  persist<TaskStore>(
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
      setFilter: (filter: string) => set({ filter }),
    }),
    {
      name: "task-store",
    }
  )
);

export default useTaskStore;
