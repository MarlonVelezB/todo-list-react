import React from "react";
import ProgressStats from "./components/ProgressStats";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import { Fab } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import DialogComponent, { useDialog } from "../../components/dialog/DialogComponent";
import TaskForm from "../task/components/TaskForm";

const Home: React.FC = () => {
  const { open, openDialog, closeDialog } = useDialog();

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
      <div className="fixed bottom-6 right-6 z-50">
        <Fab color="primary" aria-label="add" onClick={openDialog}>
          <FaPlus />
        </Fab>
      </div>

      <DialogComponent
        open={open}
        onClose={closeDialog}
        title="New Task"
        content={<TaskForm />}
      />
    </div>
  );
};
export default Home;
