import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";

type FilterType = "todas" | "activas" | "completadas";

interface TaskFiltersProps {
  onFilterChange?: (filter: FilterType) => void;
  initialFilter?: FilterType;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  onFilterChange,
  initialFilter = "todas",
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>(initialFilter);
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [order, setOrder] = useState(false);
  const [orderType, setOrderType] = useState("");

  const filters: Array<{ key: FilterType; label: string; count?: number }> = [
    { key: "todas", label: "Todas" },
    { key: "activas", label: "Activas" },
    { key: "completadas", label: "Completadas" },
  ];

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    onFilterChange?.(filter); // Llama al callback si se proporciona
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleChangeOrderType = (event: SelectChangeEvent) => {
    setOrderType(event.target.value);
  };

  const handleChangePriority = (event: SelectChangeEvent) => {
    setPriority(event.target.value);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6 mt-6">
      {/* Filtro general */}
      <div className="flex flex-row gap-3 mb-4">
        {filters.map(({ key, label }) => (
          <Button
            key={key}
            variant={activeFilter === key ? "contained" : "outlined"}
            onClick={() => handleFilterChange(key)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Filtros específicos */}
      <div className="flex md:flex-row flex-col gap-4">
        <TextField
          className="flex-1" // Ocupa todo el espacio disponible
          label="Buscar tareas..."
          variant="outlined"
        />

        <FormControl className="w-90">
          <InputLabel id="category-select-label">Categorías</InputLabel>
          <Select
            name="category"
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="Categorías"
            onChange={handleChangeCategory}
          >
            <MenuItem value="trabajo">Trabajo</MenuItem>
            <MenuItem value="personal">Personal</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="w-90">
          <InputLabel id="priority-select-label">Prioridad</InputLabel>
          <Select
            name="priority"
            labelId="priority-select-label"
            id="priority-select"
            value={priority}
            label="Prioridad"
            onChange={handleChangePriority}
          >
            <MenuItem value="alta">Alta</MenuItem>
            <MenuItem value="media">Media</MenuItem>
            <MenuItem value="baja">Baja</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="flex md:flex-row flex-col gap-4 mt-4 items-center">
        <FormControl className="w-90">
          <InputLabel id="order-select-label">Order</InputLabel>
          <Select
            name="order"
            labelId="order-select-label"
            id="order-select"
            label="Order"
            value={orderType}
            onChange={handleChangeOrderType}
          >
            <MenuItem value="titulo">Título</MenuItem>
            <MenuItem value="fecha">Fecha vencimiento</MenuItem>
            <MenuItem value="prioridad">Prioridad</MenuItem>
          </Select>
        </FormControl>

        <ToggleButton
          value="check"
          selected={order}
          onChange={() => setOrder((prevSelected) => !prevSelected)}
        >
          {order ? (
            <div className="flex flex-row items-center gap-2">
              <FaLongArrowAltDown className="text-lg" />
              <span>Desendente</span>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <FaLongArrowAltUp className="text-lg" />
              <span>Acendente</span>
            </div>
          )}
        </ToggleButton>
      </div>

      {/* IMPLEMENTAR LISTA DE CARDS DE LAS TAREAS Y LA PANTALLA PARA CREAR LA TAREA */}
    </div>
  );
};

export default TaskFilters;
