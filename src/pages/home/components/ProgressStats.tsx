import { LinearProgress } from "@mui/material";
import { FaCheckCircle, FaClipboardList, FaClock } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { TbAlertOctagonFilled } from "react-icons/tb";


interface ProgressStatsProps {
  taskCounts: number;
  taskActive?: number;
  taskCompleted?: number;
  taskOverdue?: number;
  total: number;
}

const ProgressStats = ({
  taskCounts,
  total,
  taskActive,
  taskCompleted,
  taskOverdue,
}: ProgressStatsProps) => {
  const getProcentage = (count: number) => {
    const percentage = (count / total) * 100;
    return `${Math.round(percentage)}%`;
  };

  const stats = [
    {
      label: "Total",
      value: total ? total : 0,
      icon: <FaClipboardList />,
      color: "text-blue-500",
    },
    {
      label: "Activas",
      value: taskActive ? taskActive : total - taskCounts,
      icon: <FaClock />,
      color: "text-yellow-500",
    },
    {
      label: "Completadas",
      value: taskCompleted ? taskCompleted : taskCounts,
      icon: <FaCheckCircle />,
      color: "text-green-500",
    },
    {
      label: "Vencidas",
      value: taskOverdue ? taskOverdue : 0,
      icon: <TbAlertOctagonFilled />,
      color: "text-red-500",
    },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-elevation-1 mb-6 mt-6">
        {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold mb-2">Progreso de Tareas</h2>
        <div className="flex items-center">
          <IoMdTrendingUp className="text-2xl" />
          <span className="ml-2 text-2xl font-medium">
            {getProcentage(taskCounts)}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex items-center justify-end mb-2">
          <span className="text-sm text-muted-foreground">
            {taskCounts} de {total} tareas completadas
          </span>
        </div>
        <LinearProgress
          variant="determinate"
          value={taskCounts}
          sx={{ height: 12, borderRadius: 4 }}
        />
      </div>

        {/* Stats */}
      <div className="m-10 flex justify-around gap-2">
        {stats.map((stat) => (
          <div className="flex flex-col justify-center items-center text-muted-foreground w-fit text-2xl">
            {stat.icon && (
              <div className={`mb-1 ${stat.color} text-3xl mb-2`}>{stat.icon}</div>
            )}
            <span className="text-3xl font-bold text-black">{stat.value}</span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStats;
