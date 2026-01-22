import { createContext } from "react";
import type { TaskProps } from "./TaskProvider";

export interface TaskContextType {
  allTask: TaskProps[];
  setAllTask: React.Dispatch<React.SetStateAction<TaskProps[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchFilter: TaskProps[];
}

export const TaskContext = createContext<TaskContextType | null>(null);
