import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Divider } from "@mui/material";
import InputComponent from "../../../components/ui/InputComponent";
import { useDialogStore } from "../../../components/dialog/DialogStore";
import ButtoComponent from "../../../components/ui/ButtonComponent";
import { FaFolder, FaPlus } from "react-icons/fa";
import IconSelector from "./IconSelector";
import ColorPicker from "./ColorPicker";
import { iconMap } from "../../../testData";

// Schema de validación con Yup
const schema = yup.object({
  categoryName: yup
    .string()
    .required("Debes colocar un nombre a la categoría")
    .min(5, "El nombre debe tener al menos 3 caracteres")
    .max(10, "El nombre no puede exceder 10 caracteres"),
  categoryDescription: yup
    .string()
    .max(200, "La descripción no puede exceder 200 caracteres"),
  categoryIcon: yup.string(),
  categoryColor: yup.string(),
});

const CategoeryForm = () => {
  // Configuración del formulario
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // ← Agrega esto
      categoryName: "",
      categoryDescription: "",
      categoryIcon: "FaFolder",
      categoryColor: "#6b7280",
    },
  });

  const [name, description, icon, color] = watch([
    "categoryName",
    "categoryDescription",
    "categoryIcon",
    "categoryColor",
  ]);

  const { closeDialog } = useDialogStore();

  const onSubmit = (data: any) => {
    console.log("Datos:", data);
    closeDialog();
  };

  const onCancel = () => {
    closeDialog();
  };

  const getIcon = (iconName: string, color: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? (
      <IconComponent size={24} color={color} />
    ) : (
      <FaFolder size={20} color={color} />
    );
  };

  const lightenColor = (hex: string, percent: number): string => {
    hex = hex.replace(/^#/, "");

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = Math.round(r + (255 - r) * percent);
    g = Math.round(g + (255 - g) * percent);
    b = Math.round(b + (255 - b) * percent);

    const toHex = (c: number) => c.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-4">
        <Controller
          name="categoryName"
          control={control}
          render={({ field, fieldState }) => (
            <InputComponent
              label="Category Name"
              type="text"
              error={fieldState.error}
              placeholder="Work, Personal, Health, etc..."
              required
              {...field}
            />
          )}
        />
        <InputComponent
          label={"Description"}
          type={"text"}
          error={errors.categoryDescription}
          placeholder="This is a brief description of a category..."
          {...register("categoryDescription")}
          multiline={true}
          rows={5}
          countCharacters={true}
          maximumCharacters={200}
        />

        <Controller
          name="categoryIcon"
          control={control}
          render={({ field }) => (
            <IconSelector
              value={field.value}
              onChange={field.onChange}
              name={field.name}
            />
          )}
        />

        <Controller
          name="categoryColor"
          control={control}
          rules={{ required: "Please select a color" }}
          render={({ field, fieldState }) => (
            <div>
              <ColorPicker value={field.value} onChange={field.onChange} />
              {fieldState.error && (
                <p style={{ color: "red" }}>{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <Divider />

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Preview</h3>

        <div className="flex items-start gap-4 p-4 rounded-2xl shadow-sm bg-white">
          {/* Icono */}
          <div
            className="flex items-center justify-center w-14 h-14 rounded-xl"
            style={{ backgroundColor: lightenColor(color || "#f8fafc", 0.8) }}
          >
            {getIcon(icon || "FaFolder", color || "#3b82f6")}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="font-semibold text-base text-gray-900">
              {name || "Category Name"}
            </span>
            <span className="text-sm text-gray-500">
              {description || "This is a brief description of a category..."}
            </span>
          </div>
        </div>
      </div>

      <Divider />

      <div className="flex justify-end gap-2 mt-4">
        <ButtoComponent
          label="Cancel"
          variant="text"
          style="error-text"
          onClick={onCancel}
        />
        <ButtoComponent
          type="submit"
          label="Add Category"
          variant="contained"
          style="primary"
          icon={<FaPlus />}
        />
      </div>
    </form>
  );
};

export default CategoeryForm;
