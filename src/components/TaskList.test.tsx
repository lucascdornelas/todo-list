import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "./TaskList";
import useTaskStore from "../store/taskStore";

vi.mock("../store/taskStore", () => ({
  default: vi.fn(),
}));

describe("TaskList Component", () => {
  it("should render tasks and handle pagination", () => {
    vi.mocked(useTaskStore).mockImplementation((selector) => {
      return selector({
        tasks: [
          { id: 1, text: "Tarefa 1", completed: false },
          { id: 2, text: "Tarefa 2", completed: false },
          { id: 3, text: "Tarefa 3", completed: false },
          { id: 4, text: "Tarefa 4", completed: false },
          { id: 5, text: "Tarefa 5", completed: false },
          { id: 6, text: "Tarefa 6", completed: false },
        ],
        filterText: "",
        filter: "all",
        removeTask: vi.fn(),
        toggleTaskCompletion: vi.fn(),
        editTask: vi.fn(),
        addTask: vi.fn().mockImplementation((text: string) => {}),
        deleteAllTasks: vi.fn(),
        markAllCompleted: vi.fn(),
        setFilterText: vi.fn().mockImplementation((filterText: string) => {}),
        setFilter: vi
          .fn()
          .mockImplementation((filter: "all" | "active" | "completed") => {}),
      });
    });

    render(<TaskList tasksPerPage={5} />);

    expect(screen.getByText("Tarefa 1")).toBeInTheDocument();
    expect(screen.getByText("Tarefa 2")).toBeInTheDocument();
    expect(screen.getByText("Tarefa 3")).toBeInTheDocument();
    expect(screen.getByText("Tarefa 4")).toBeInTheDocument();
    expect(screen.getByText("Tarefa 5")).toBeInTheDocument();
    expect(screen.queryByText("Tarefa 6")).not.toBeInTheDocument();

    const nextPageButton = screen.getByLabelText("Próxima página");
    fireEvent.click(nextPageButton);

    expect(screen.getByText("Tarefa 6")).toBeInTheDocument();
    expect(screen.queryByText("Tarefa 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Tarefa 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Tarefa 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Tarefa 4")).not.toBeInTheDocument();
    expect(screen.queryByText("Tarefa 5")).not.toBeInTheDocument();
  });

  it("should show 'Nenhuma tarefa encontrada' when no tasks match the filter", () => {
    vi.mocked(useTaskStore).mockImplementation((selector) => {
      return selector({
        tasks: [],
        filterText: "",
        filter: "all",
        removeTask: vi.fn(),
        toggleTaskCompletion: vi.fn(),
        editTask: vi.fn(),
        addTask: vi.fn().mockImplementation((text: string) => {}),
        deleteAllTasks: vi.fn(),
        markAllCompleted: vi.fn(),
        setFilterText: vi.fn().mockImplementation((filterText: string) => {}),
        setFilter: vi
          .fn()
          .mockImplementation((filter: "all" | "active" | "completed") => {}),
      });
    });

    render(<TaskList />);

    expect(screen.getByText("Nenhuma tarefa encontrada.")).toBeInTheDocument();
  });
});
