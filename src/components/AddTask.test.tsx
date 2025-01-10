import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AddTask from "./AddTask";

const mockAddTask = vi.fn();

describe("AddTask Component", () => {
  beforeEach(() => {
    vi.mock("../store/taskStore", () => ({
      default: vi.fn((selector) =>
        selector({
          tasks: [],
          filterText: "",
          filter: "all",
          addTask: mockAddTask,
          markAllCompleted: vi.fn(),
          deleteAllTasks: vi.fn(),
          toggleTaskCompletion: vi.fn(),
          setFilter: vi.fn(),
          setFilterText: vi.fn(),
          removeTask: vi.fn(),
          editTask: vi.fn(),
        })
      ),
    }));

    mockAddTask.mockReset();
  });

  it("should render the input and button elements", () => {
    render(<AddTask />);

    expect(
      screen.getByPlaceholderText("Digite uma nova tarefa")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Adicionar Tarefa/i })
    ).toBeInTheDocument();
  });

  it("should call addTask with the input value when the form is submitted", () => {
    render(<AddTask />);

    const input = screen.getByPlaceholderText("Digite uma nova tarefa");
    fireEvent.change(input, { target: { value: "Minha Nova Tarefa" } });

    const button = screen.getByRole("button", { name: /Adicionar Tarefa/i });
    fireEvent.click(button);

    expect(mockAddTask).toHaveBeenCalledWith("Minha Nova Tarefa");

    expect(input).toHaveValue("");
  });

  it("should not call addTask when the input is empty", () => {
    render(<AddTask />);

    const button = screen.getByRole("button", { name: /Adicionar Tarefa/i });
    fireEvent.click(button);

    expect(mockAddTask).not.toHaveBeenCalled();
  });
});
