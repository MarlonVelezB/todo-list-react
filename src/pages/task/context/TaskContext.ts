import { create } from "zustand";
import type { Priority, Task } from "../../../types/TaskTypes";
import type { FilterType } from "../../home/components/TaskFilters";

interface TaskState {
  originalTasks: Task[];
  tasks: Task[];
  filter: FilterType;

  // acciones
  setTasks: (tasks: Task[]) => void;
  setFilter: (filterType: "todas" | "activas" | "completadas") => void;
  setFilterByCategory: (category: string) => void;
  setFilterByPriority: (priority: Priority) => void;
  setOrder: (orderType: string, ascending: boolean) => void;
  setFilterByTitleOrDescription: (param: string) => void;
  getExpiredTasks: () => Task[];
}

const useTaskStore = create<TaskState>((set, get) => ({
  // Estado inicial
  originalTasks: [],
  tasks: [],
  filter: "todas",

  // acciones
  setTasks: (tasks) => set({ originalTasks: tasks, tasks }),

  setFilterByTitleOrDescription: (param) =>
    set((state: TaskState) => {
      const tasksFiltered = state.tasks.filter(
        (task: Task) =>
          task.title.toLowerCase().includes(param.toLowerCase()) ||
          task.description?.toLocaleLowerCase().includes(param.toLowerCase())
      );

      if (tasksFiltered && param) {
        return {
          tasks: tasksFiltered,
        };
      }

      return {
        tasks: state.originalTasks
      }
    }),

  setFilter: (filterType) =>
    set((state) => {
      switch (filterType) {
        case "todas":
          return {
            tasks: state.originalTasks,
            filter: filterType,
          };
        case "completadas":
          return {
            tasks: state.originalTasks.filter((task) => task.completed),
            filter: filterType,
          };
        case "activas":
          return {
            tasks: state.originalTasks.filter((task) => !task.completed),
            filter: filterType,
          };
        default:
          return state;
      }
    }),

  setFilterByCategory: (category: string) =>
    set((state) => {
      if (category === "") {
        return {
          tasks: state.originalTasks,
        };
      }

      const filtered = state.originalTasks.filter(
        (task) => task.category?.toLowerCase() === category.toLowerCase()
      );

      return {
        tasks: filtered,
      };
    }),

  setFilterByPriority: (priority: Priority) =>
    set((state) => {
      if (!priority) {
        return {
          tasks: state.originalTasks,
        };
      }

      const filtered = state.originalTasks.filter(
        (task) => task.priority === priority
      );

      return {
        tasks: filtered,
      };
    }),

  setOrder: (orderType: string, ascending: boolean) =>
    set((state) => {
      console.log("orderType111: ", orderType);
      if (!orderType) {
        console.log("orderType2222: ", orderType);
        return { tasks: state.originalTasks };
      }
      const sortedTasks = [...state.tasks].sort((a, b) => {
        let comparison = 0;

        if (orderType === "title") {
          comparison = a.title.localeCompare(b.title);
        } else if (orderType === "date") {
          comparison = a.dueDate.getTime() - b.dueDate.getTime();
        } else if (orderType === "priority") {
          const priorityOrder = { high: 3, medium: 2, low: 1 }; // o 'alta','media','baja'
          comparison =
            (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
        }

        return ascending ? comparison : -comparison;
      });

      return { tasks: sortedTasks };
    }),

  getExpiredTasks: () => {
    const today = new Date();
    return get().originalTasks.filter(
      (task) => task.dueDate < today && !task.completed
    );
  },
}));

export default useTaskStore;
