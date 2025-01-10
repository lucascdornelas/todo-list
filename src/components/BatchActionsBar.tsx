import { FormattedMessage } from "react-intl";
import useTaskStore from "../store/taskStore";
import Button from "./ui/Button";

export default function BatchActionsBar() {
  const deleteAllTasks = useTaskStore((state) => state.deleteAllTasks);
  const markAllCompleted = useTaskStore((state) => state.markAllCompleted);

  return (
    <div className="flex justify-start mt-4 space-x-2">
      <Button onClick={markAllCompleted}>
        <FormattedMessage id="app.task.batch.complete" />  
      </Button>
      <Button onClick={deleteAllTasks} variant="destructive">
        <FormattedMessage id="app.task.batch.delete" />
      </Button>
    </div>
  );
}
