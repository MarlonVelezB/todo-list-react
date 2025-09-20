import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import InputComponent from "../../../components/ui/InputComponent";
import SelectComponent from "../../../components/ui/SelectComponent";

import DatePickerComponent from "../../../components/ui/DatePickerComponent";
import { Divider } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import ButtoComponent from "../../../components/ui/ButtonComponent";
import { useDialogStore } from "../../../components/dialog/DialogStore";

const schema = yup.object({
  title: yup
    .string()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres"),
  description: yup
    .string()
    .optional()
    .max(500, "La descripción no puede superar los 500 caracteres"),
  category: yup.string().optional(),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"], "Prioridad inválida")
    .required("La prioridad es obligatoria"),
  dueDate: yup
    .date()
    .required("La fecha de vencimiento es obligatoria")
    .min(new Date(), "La fecha debe ser en el futuro"),
  completed: yup.boolean().required("El estado de completado es obligatorio"),
  assignee: yup
    .number()
    .required("El usuario asignado es obligatorio")
    .positive("El ID del usuario debe ser positivo"),
});

const TaskForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control, // Agregar control para usar Controller
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { closeDialog } = useDialogStore();

  const onSubmit = (data: any) => {
    console.log("Datos:", data);
    closeDialog(); 
  };

  const onCancel = () => {
    closeDialog();
  };

  const categories = [
    { value: "personal", label: "Personal" },
    { value: "work", label: "Work" },
    { value: "health", label: "Health" },
  ];

  const priorities = [
    { value: "high", label: "High" },
    { value: "medium", label: "Midium" },
    { value: "low", label: "Low" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-4">
        <InputComponent
          label={"Task Title"}
          type={"text"}
          error={errors.title}
          placeholder="Do anything..."
          required
          {...register("title")}
        />
        <InputComponent
          label={"Description"}
          type={"text"}
          error={errors.description}
          placeholder="This is an example of a task description...."
          {...register("description")}
          multiline={true}
          rows={3}
          countCharacters={true}
          maximumCharacters={50}
        />

        <div className="flex gap-4 items-center">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SelectComponent
                label="Categrory"
                options={categories}
                placeholder="Select category"
                error={errors.category}
                {...field}
              />
            )}
          />

          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <SelectComponent
                label="Priority"
                options={priorities}
                placeholder="Select priority"
                error={errors.priority}
                required
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <DatePickerComponent
              label="Select Due Date"
              error={errors.dueDate}
              placeholder="Due Date"
              required
              {...field}
            />
          )}
        />
      </div>

      <Divider />

      <div className="flex justify-end gap-2 mt-4">
        <ButtoComponent label="Cancel" variant="text" style="error-text" onClick={onCancel}/>
        <ButtoComponent type="submit" label="Create Task" variant="contained" style="primary" icon={<FaPlus />}/>
      </div>
    </form>
  );
};

export default TaskForm;
