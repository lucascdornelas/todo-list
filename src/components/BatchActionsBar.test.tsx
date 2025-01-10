import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BatchActionsBar from "./BatchActionsBar";

export const mockMarkAllCompleted = vi.fn();
export const mockDeleteAllTasks = vi.fn();

describe("BatchActionsBar Component", () => {
  beforeEach(() => {
    vi.mock("../store/taskStore", () => ({
      default: vi.fn((selector) =>
        selector({
          tasks: [],
          filterText: "",
          filter: "all",
          addTask: vi.fn(),
          markAllCompleted: mockMarkAllCompleted,
          deleteAllTasks: mockDeleteAllTasks,
          toggleTaskCompletion: vi.fn(),
          setFilter: vi.fn(),
          setFilterText: vi.fn(),
          removeTask: vi.fn(),
          editTask: vi.fn(),
        })
      ),
    }));

    mockMarkAllCompleted.mockReset();
    mockDeleteAllTasks.mockReset();
  });

  it("should render the action buttons", () => {
    render(<BatchActionsBar />);

    expect(
      screen.getByRole("button", { name: /Marcar Todas como Completas/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Excluir Todas/i })
    ).toBeInTheDocument();
  });

  it("should call markAllCompleted when the 'Marcar Todas como Completas' button is clicked", () => {
    render(<BatchActionsBar />);

    const markAllCompletedButton = screen.getByRole("button", {
      name: /Marcar Todas como Completas/i,
    });
    fireEvent.click(markAllCompletedButton);

    expect(mockMarkAllCompleted).toHaveBeenCalledTimes(1);
  });

  it("should call deleteAllTasks when the 'Excluir Todas' button is clicked", () => {
    render(<BatchActionsBar />);

    const deleteAllButton = screen.getByRole("button", {
      name: /Excluir Todas/i,
    });
    fireEvent.click(deleteAllButton);

    expect(mockDeleteAllTasks).toHaveBeenCalledTimes(1);
  });
});
