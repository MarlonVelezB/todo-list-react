import React from "react";
import ProgressStats from "./components/ProgressStats";
import TaskFilters from "./components/TaskFilters";

const Home: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Panel de Tareas
      </h1>
      <p className="text-muted-foreground">
        Gestiona tus tareas de manera eficiente con nuestra hermosa interfaz
      </p>
      <ProgressStats taskCounts={5} total={20} />
      <TaskFilters />
      {/* Aquí puedes agregar más componentes o funcionalidades según sea necesario */}
    </div>
  );
};
export default Home;
