import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "./TaskItem";
import { Task } from "../types";
import { IntlProvider } from "react-intl";
import messages from "../i18n/messages";

export const mockToggleTaskCompletion = vi.fn();
export const mockRemoveTask = vi.fn();
export const mockEditTask = vi.fn();

const mockTask: Task = {
  id: 1,
  text: "Teste 123",
  completed: false,
};

describe("TaskItem Component", () => {
  beforeEach(() => {
    mockToggleTaskCompletion.mockReset();
    mockRemoveTask.mockReset();
    mockEditTask.mockReset();
  });

  it("should render the task text", () => {
    render(
      <TaskItem
        task={mockTask}
        toggleTaskCompletion={mockToggleTaskCompletion}
        removeTask={mockRemoveTask}
        editTask={mockEditTask}
      />,
      {
        wrapper: ({ children }) => (
          <IntlProvider locale="pt" messages={messages["pt"]}>
            {children}
          </IntlProvider>
        ),
      }
    );

    expect(screen.getByText(/Teste 123/i)).toBeInTheDocument();
  });

  it("should call toggleTaskCompletion when the check button is clicked", () => {
    render(
      <TaskItem
        task={mockTask}
        toggleTaskCompletion={mockToggleTaskCompletion}
        removeTask={mockRemoveTask}
        editTask={mockEditTask}
      />,
      {
        wrapper: ({ children }) => (
          <IntlProvider locale="pt" messages={messages["pt"]}>
            {children}
          </IntlProvider>
        ),
      }
    );

    const toggleButton = screen.getByLabelText("Marcar como Completa");
    fireEvent.click(toggleButton);

    expect(mockToggleTaskCompletion).toHaveBeenCalledTimes(1);
    expect(mockToggleTaskCompletion).toHaveBeenCalledWith(mockTask.id);
  });

  it("should call removeTask when the remove button is clicked", () => {
    render(
      <TaskItem
        task={mockTask}
        toggleTaskCompletion={mockToggleTaskCompletion}
        removeTask={mockRemoveTask}
        editTask={mockEditTask}
      />,
      {
        wrapper: ({ children }) => (
          <IntlProvider locale="pt" messages={messages["pt"]}>
            {children}
          </IntlProvider>
        ),
      }
    );

    const removeButton = screen.getByLabelText("Excluir Tarefa");
    fireEvent.click(removeButton);

    expect(mockRemoveTask).toHaveBeenCalledTimes(1);
    expect(mockRemoveTask).toHaveBeenCalledWith(mockTask.id);
  });

  it("should enter edit mode on double-click and save changes", () => {
    render(
      <TaskItem
        task={mockTask}
        toggleTaskCompletion={mockToggleTaskCompletion}
        removeTask={mockRemoveTask}
        editTask={mockEditTask}
      />,
      {
        wrapper: ({ children }) => (
          <IntlProvider locale="pt" messages={messages["pt"]}>
            {children}
          </IntlProvider>
        ),
      }
    );

    const taskText = screen.getByText(/Teste 123/i);
    fireEvent.doubleClick(taskText);

    const input = screen.getByDisplayValue(/Teste 123/i);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Teste 321" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockEditTask).toHaveBeenCalledTimes(1);
    expect(mockEditTask).toHaveBeenCalledWith(mockTask.id, "Teste 321");
  });

  it("should cancel edit mode on Escape key", () => {
    render(
      <TaskItem
        task={mockTask}
        toggleTaskCompletion={mockToggleTaskCompletion}
        removeTask={mockRemoveTask}
        editTask={mockEditTask}
      />,
      {
        wrapper: ({ children }) => (
          <IntlProvider locale="pt" messages={messages["pt"]}>
            {children}
          </IntlProvider>
        ),
      }
    );

    const taskText = screen.getByText(/Teste 123/i);
    fireEvent.doubleClick(taskText);

    const input = screen.getByDisplayValue(/Teste 123/i);
    fireEvent.change(input, { target: { value: "Novo Texto" } });
    fireEvent.keyDown(input, { key: "Escape", code: "Escape" });

    expect(screen.getByText(/Teste 123/i)).toBeInTheDocument();
    expect(mockEditTask).not.toHaveBeenCalled();
  });
});
