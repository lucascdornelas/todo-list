import { FormattedMessage, useIntl } from "react-intl";
import useTaskStore from "../store/taskStore";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function FilterBar() {
  const filterText = useTaskStore((state) => state.filterText);
  const setFilterText = useTaskStore((state) => state.setFilterText);
  const filter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);

  const { formatMessage } = useIntl();

  return (
    <div className="flex items-center flex-col-reverse gap-2 mb-4 flex-wrap md:flex-row md:flex-nowrap">
      <div className="flex gap-2 w-full md:flex-row md:w-auto">
        <Button
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "primary" : "secondary"}
          className="w-full"
        >
          <FormattedMessage id="app.task.filter.all" />
        </Button>
        <Button
          onClick={() => setFilter("active")}
          variant={filter === "active" ? "primary" : "secondary"}
          className="w-full"
        >
          <FormattedMessage id="app.task.filter.active" />
        </Button>
        <Button
          onClick={() => setFilter("completed")}
          variant={filter === "completed" ? "primary" : "secondary"}
          className="w-full"
        >
          <FormattedMessage id="app.task.filter.completed" />
        </Button>
      </div>
      <Input
        type="text"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        placeholder={formatMessage({ id: "app.task.filter.placeholder" })}
        className="w-full"
      />
    </div>
  );
}
