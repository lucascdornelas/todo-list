import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "./FilterBar";
import { IntlProvider } from "react-intl";
import messages from "../i18n/messages";

const mockSetFilter = vi.fn();
const mockSetFilterText = vi.fn();

describe("FilterBar Component", () => {
  beforeEach(() => {
    vi.mock("../store/taskStore", () => ({
      default: vi.fn((selector) =>
        selector({
          tasks: [],
          filterText: "",
          filter: "all",
          setFilter: mockSetFilter,
          setFilterText: mockSetFilterText,
          addTask: vi.fn(),
          markAllCompleted: vi.fn(),
          deleteAllTasks: vi.fn(),
          toggleTaskCompletion: vi.fn(),
          removeTask: vi.fn(),
          editTask: vi.fn(),
        })
      ),
    }));

    mockSetFilter.mockReset();
    mockSetFilterText.mockReset();
  });

  it("should render filter buttons and input", () => {
    render(<FilterBar />, {
      wrapper: ({ children }) => (
        <IntlProvider locale="pt" messages={messages["pt"]}>
          {children}
        </IntlProvider>
      ),
    });

    expect(screen.getByRole("button", { name: /Todas/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Ativas/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Completas/i })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Buscar tarefa")
    ).toBeInTheDocument();
  });

  it("should call setFilter when filter buttons are clicked", () => {
    render(<FilterBar />, {
      wrapper: ({ children }) => (
        <IntlProvider locale="pt" messages={messages["pt"]}>
          {children}
        </IntlProvider>
      ),
    });

    const todasButton = screen.getByRole("button", { name: /Todas/i });
    const ativasButton = screen.getByRole("button", { name: /Ativas/i });
    const completasButton = screen.getByRole("button", { name: /Completas/i });

    fireEvent.click(todasButton);
    expect(mockSetFilter).toHaveBeenCalledWith("all");

    fireEvent.click(ativasButton);
    expect(mockSetFilter).toHaveBeenCalledWith("active");

    fireEvent.click(completasButton);
    expect(mockSetFilter).toHaveBeenCalledWith("completed");

    expect(mockSetFilter).toHaveBeenCalledTimes(3);
  });

  it("should update filterText when typing in the input", () => {
    render(<FilterBar />, {
      wrapper: ({ children }) => (
        <IntlProvider locale="pt" messages={messages["pt"]}>
          {children}
        </IntlProvider>
      ),
    });

    const input = screen.getByPlaceholderText("Buscar tarefa");

    fireEvent.change(input, { target: { value: "Nova tarefa" } });

    expect(mockSetFilterText).toHaveBeenCalledWith("Nova tarefa");
    expect(mockSetFilterText).toHaveBeenCalledTimes(1);
  });
});
