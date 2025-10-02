import { Checkbox, Chip, IconButton } from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";
import type { Task } from "../../../types/TaskTypes";
import { useEffect, useState } from "react";
import { testTasks } from "../../../testData";
import { FaCalendar } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import useTaskStore from "../../task/context/TaskContext";

const TaskList: React.FC = () => {
  const label = { inputProps: { "aria-label": "completed" } };
  const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);
  const { setTasks, tasks } = useTaskStore();

  useEffect(() => {
    // Cargar las tareas de prueba al montar el componente
    setTasks(testTasks);
  }, [setTasks]);

  const handleTaskToggle = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    );
    setTasks(updatedTasks);
  };

  const isExpiredTask = (dueDate: Date): boolean => {
    const today = new Date();

    if (dueDate === null) return false;
    return dueDate < today;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#ef4444"; // rojo (Tailwind red-500)
      case "medium":
        return "#f97316"; // naranja (Tailwind orange-500)
      case "low":
        return "#22c55e"; // verde (Tailwind green-500)
      default:
        return "#6b7280"; // gris (Tailwind gray-500)
    }
  };

  return (
    <>
      {tasks.map((task: Task) => (
        <div
          key={task.id}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6 mt-6 cursor-pointer card-effect"
          onMouseEnter={() => setHoveredTaskId(task.id)}
          onMouseLeave={() => setHoveredTaskId(null)}
        >
          <div className="flex items-center">
            <div id="task-check">
              <Checkbox
                {...label}
                checked={task.completed}
                onChange={() => handleTaskToggle(task.id)}
              />
            </div>

            <div id="task-header" className="flex flex-col gap-y-2 ml-3 flex-1">
              <div className="flex justify-between items-center w-full">
                {/*  */}
                <h2
                  className={`text-lg font-medium ${
                    task.completed
                      ? "line-through text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {task.title}
                </h2>
                <div
                  className={`flex gap-x-2 ${
                    hoveredTaskId === task.id ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-300`}
                >
                  <IconButton aria-label="edit">
                    <MdEdit />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <MdDelete className="text-red-500" />
                  </IconButton>
                </div>
              </div>
              <p>{task.description}</p>
            </div>
          </div>
          <div
            id="taxk-footer"
            className="flex justify-between items-center mt-5"
          >
            <div id="task-tag" className="flex gap-x-2">
              <Chip
                label={task.priority}
                sx={{
                  color: getPriorityColor(task.priority),
                  backgroundColor: `${getPriorityColor(task.priority)}33`, // 33 es el valor hexadecimal para 20% de opacidad
                }}
              />
              <Chip label={task.category} />
            </div>
            <div className="flex items-center gap-x-2">
              <FaCalendar
                className={`text-gray-500 ${
                  isExpiredTask(task.dueDate) && !task.completed
                    ? "text-red-500"
                    : ""
                }`}
              />
              <p
                className={`text-sm ${
                  isExpiredTask(task.dueDate) && !task.completed
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {task.dueDate.toLocaleDateString()}
              </p>
              <RiErrorWarningFill
                className={`text-red-500 text-xl ${
                  isExpiredTask(task.dueDate) && !task.completed ? "" : "hidden"
                }`}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskList;
