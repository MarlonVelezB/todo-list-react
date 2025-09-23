import React from "react";
import ProgressStats from "./components/ProgressStats";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import DialogComponent from "../../components/dialog/DialogComponent";
import TaskForm from "../task/components/TaskForm";
import { useDialogStore } from "../../components/dialog/DialogStore";
import FloatingButton from "../../components/floatingButton/FloatingButton";

const Home: React.FC = () => {
  const { openDialog, closeDialog } = useDialogStore();

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
      <TaskList />

      <FloatingButton tooltip="Add Category" onClick={openDialog} />

      <DialogComponent
        onClose={closeDialog}
        title="New Task"
        content={<TaskForm />}
      />
    </div>
  );
};
export default Home;
