import { createContext, ReactNode, useState } from "react";
import { reconcilateColumnItems } from "../utils/dragReorderUtil";
import type { ColumnsType, ItemType } from "../types";

type ContextType = {
  columns: ColumnsType;
  errorForColumnRestriction: boolean;
  draggingTaskIdWithError: null | string;
  selectedTasks: ItemType[];
  draggingTaskId: string | null;
  onSetColumns: React.Dispatch<React.SetStateAction<ColumnsType>>;
  onSetSelectedTasks: React.Dispatch<React.SetStateAction<ItemType[]>>;
  onSetDraggingTaskId: React.Dispatch<React.SetStateAction<null | string>>;
  onSetErrorForColumnRestriction: React.Dispatch<React.SetStateAction<boolean>>;
  onSetDraggingTaskIdWithError: React.Dispatch<
    React.SetStateAction<null | string>
  >;
};

export const data = [
  {
    id: "1",
    Task: "Item1",
    isEven: true,
    column: 1,
    order: 1,
  },
  {
    id: "2",
    Task: "Item2",
    isEven: false,
    column: 2,
    order: 2,
  },
  {
    id: "3",
    Task: "Item3",
    isEven: true,
    column: 3,
    order: 3,
  },
  {
    id: "4",
    Task: "Item4",
    isEven: false,
    column: 4,
    order: 4,
  },
  {
    id: "5",
    Task: "Item5",
    isEven: false,
    column: 5,
    order: 5,
  },
];

export const idTitleMap = {
  "1": "To-do",
  "2": "In Progress",
  "3": "Fail",
  "4": "Done",
};

export const columnsFromBackend: ColumnsType = {
  1: {
    title: "To-do",
    items: data,
  },
  2: {
    title: "In Progress",
    items: [],
  },
  3: {
    title: "Fail",
    items: [],
  },
  4: {
    title: "Done",
    items: [],
  },
};

export const dragDataContext = createContext<ContextType>({} as ContextType);

export default function DragDataContext({ children }: { children: ReactNode }) {
  const [columns, setColumns] = useState<ColumnsType>(
    reconcilateColumnItems(columnsFromBackend)
  );
  const [errorForColumnRestriction, setErrorForColumnRestriction] =
    useState(false);
  const [draggingTaskIdWithError, setDraggingTaskIdWithError] = useState<
    null | string
  >(null);
  const [selectedTasks, setSelectedTasks] = useState<ItemType[]>([]);
  const [draggingTaskId, setDraggingTaskId] = useState<null | string>(null);

  return (
    <dragDataContext.Provider
      value={{
        columns,
        errorForColumnRestriction,
        draggingTaskIdWithError,
        selectedTasks,
        draggingTaskId,
        onSetColumns: setColumns,
        onSetErrorForColumnRestriction: setErrorForColumnRestriction,
        onSetDraggingTaskIdWithError: setDraggingTaskIdWithError,
        onSetSelectedTasks: setSelectedTasks,
        onSetDraggingTaskId: setDraggingTaskId,
      }}
    >
      {children}
    </dragDataContext.Provider>
  );
}
