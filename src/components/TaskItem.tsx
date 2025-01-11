import { Check, Undo2, Trash2, Edit2 } from "lucide-react";
import {
  HTMLAttributes,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import { Task } from "../types";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useIntl } from "react-intl";

import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import invariant from "tiny-invariant";
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

type TaskItemProps = {
  task: Task;
  toggleTaskCompletion: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
};

type TaskState =
  | {
      type: "idle";
    }
  | {
      type: "preview";
      container: HTMLElement;
    }
  | {
      type: "is-dragging";
    }
  | {
      type: "is-dragging-over";
      closestEdge: Edge | null;
    };

const stateStyles: {
  [Key in TaskState["type"]]?: HTMLAttributes<HTMLLIElement>["className"];
} = {
  "is-dragging": "opacity-40",
};

const idle: TaskState = { type: "idle" };

export default function TaskItem(props: TaskItemProps) {
  const { task, toggleTaskCompletion, removeTask, editTask } = props;
  const { formatMessage } = useIntl();
  const ref = useRef<HTMLLIElement | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [isExpanded, setIsExpanded] = useState(false);

  const [state, setState] = useState<TaskState>(idle);

  useEffect(() => {
    const element = ref.current;
    invariant(element);
    return combine(
      draggable({
        element,
        getInitialData() {
          return task;
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: "16px",
              y: "8px",
            }),
            render({ container }) {
              setState({ type: "preview", container });
            },
          });
        },
        onDragStart() {
          setState({ type: "is-dragging" });
        },
        onDrop() {
          setState(idle);
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          if (source.element === element) {
            return false;
          }
          return true;
        },
        getData({ input }) {
          return attachClosestEdge(task, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          });
        },
        getIsSticky: () => true,
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setState({ type: "is-dragging-over", closestEdge });
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setState((current) => {
            if (
              current.type === "is-dragging-over" &&
              current.closestEdge === closestEdge
            ) {
              return current;
            }
            return { type: "is-dragging-over", closestEdge };
          });
        },
        onDragLeave: () => setState(idle),
        onDrop: () => setState(idle),
      })
    );
  }, [task.id]);

  const handleSaveEdit = () => {
    if (editedText.trim() !== "") {
      editTask(task.id, editedText.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedText(task.text);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    if (isEditing) handleSaveEdit();
    else setIsEditing(true);
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="relative">
      <li
        ref={ref}
        className={`flex items-center justify-between p-4 rounded-lg border shadow-sm bg-white dark:bg-gray-800 transition cursor-grab
         ${task.completed ? "border-green-500" : "border-gray-300"}
         ${stateStyles[state.type] ?? ""}
         `}
        data-task-id={task.id}
      >
        {isEditing ? (
          <Input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveEdit();
              if (e.key === "Escape") handleCancelEdit();
            }}
            onBlur={handleSaveEdit}
            className="flex-1 w-auto border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:bg-gray-800 dark:border-gray-400 dark:focus:ring-gray-400 dark:text-gray-300"
            autoFocus
          />
        ) : (
          <span
            onClick={toggleExpand}
            onDoubleClick={() => setIsEditing(true)}
            className={`flex-1 text-sm cursor-pointer ${
              task.completed
                ? "line-through text-gray-500 dark:text-gray-400"
                : "text-gray-800 dark:text-gray-300"
            } ${isExpanded ? "whitespace-normal" : "truncate"}`}
          >
            {task.text}
          </span>
        )}

        <Button
          onClick={() => toggleTaskCompletion(task.id)}
          className={"ml-3 flex items-center justify-center w-10 h-10"}
          variant="success"
          size="icon"
          aria-label={formatMessage({
            id: task.completed
              ? "app.task.item.uncomplete"
              : "app.task.item.complete",
          })}
        >
          {task.completed ? <Undo2 size={20} /> : <Check size={20} />}
        </Button>

        <Button
          onClick={toggleEdit}
          className="ml-3 flex items-center justify-center w-10 h-10"
          variant="neutral"
          size="icon"
          aria-label={formatMessage({ id: "app.task.item.edit" })}
        >
          <Edit2 size={20} />
        </Button>

        <Button
          onClick={() => removeTask(task.id)}
          className="ml-3 flex items-center justify-center w-10 h-10 rounded-lg border"
          variant="warning"
          size="icon"
          aria-label={formatMessage({ id: "app.task.item.delete" })}
        >
          <Trash2 size={20} />
        </Button>
        {state.type === "is-dragging-over" && state.closestEdge ? (
          <DropIndicator edge={state.closestEdge as CustomEdge} gap={"8px"} />
        ) : null}
      </li>
    </div>
  );
}

type Orientation = "horizontal";
type CustomEdge = "top" | "bottom";

const edgeToOrientationMap: Record<CustomEdge, Orientation> = {
  top: "horizontal",
  bottom: "horizontal",
};

const orientationStyles: Record<
  Orientation,
  HTMLAttributes<HTMLElement>["className"]
> = {
  horizontal:
    "h-[--line-thickness] left-[--terminal-radius] right-0 before:left-[--negative-terminal-size]",
};

const edgeStyles: Record<CustomEdge, HTMLAttributes<HTMLElement>["className"]> =
  {
    top: "top-[--line-offset] before:top-[--offset-terminal]",
    bottom: "bottom-[--line-offset] before:bottom-[--offset-terminal]",
  };

const strokeSize = 2;
const terminalSize = 8;
const offsetToAlignTerminalWithLine = (strokeSize - terminalSize) / 2;

export function DropIndicator({
  edge,
  gap,
}: {
  edge: "top" | "bottom";
  gap: string;
}) {
  const lineOffset = `calc(-0.5 * (${gap} + ${strokeSize}px))`;

  const orientation = edgeToOrientationMap[edge];

  return (
    <div
      style={
        {
          "--line-thickness": `${strokeSize}px`,
          "--line-offset": `${lineOffset}`,
          "--terminal-size": `${terminalSize}px`,
          "--terminal-radius": `${terminalSize / 2}px`,
          "--negative-terminal-size": `-${terminalSize}px`,
          "--offset-terminal": `${offsetToAlignTerminalWithLine}px`,
        } as CSSProperties
      }
      className={`absolute z-10 bg-localiza-green pointer-events-none before:content-[''] before:w-[--terminal-size] before:h-[--terminal-size] box-border before:absolute before:border-[length:--line-thickness] before:border-solid before:border-localiza-green before:rounded-full ${
        orientationStyles[orientation]
      } ${[edgeStyles[edge]]}`}
    ></div>
  );
}
