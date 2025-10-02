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
import useTaskStore from "../../task/context/TaskContext";
import { testCategories } from "../../../testData";
import type { Category } from "../../../types/TaskTypes";

export type FilterType = "todas" | "activas" | "completadas";

interface TaskFiltersProps {
  onFilterChange?: (filter: FilterType) => void;
  initialFilter?: FilterType;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  initialFilter = "todas",
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>(initialFilter);
  const [category, setCategory] = useState<Category | null>(null);
  const [priority, setPriority] = useState("");
  const [orderSelected, setOrderSelected] = useState(false);
  const [orderType, setOrderType] = useState("");
  const { setFilter, setFilterByCategory, setFilterByPriority, setOrder, setFilterByTitleOrDescription } =
    useTaskStore();

  const filters: Array<{ key: FilterType; label: string; count?: number }> = [
    { key: "todas", label: "Todas" },
    { key: "activas", label: "Activas" },
    { key: "completadas", label: "Completadas" },
  ];

  const handleFilterChange = (filterType: FilterType) => {
    setFilter(filterType);
    setActiveFilter(filterType);
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    if (event.target.value === "") {
      setCategory(null); // limpiado
    } else {
      const selected = testCategories.find(
        (cat) => cat.name.toLowerCase() === event.target.value
      );
      setCategory(selected ?? null);
    }
    setFilterByCategory(event.target.value);
  };

  const handleChangeOrderType = (event: SelectChangeEvent) => {
    if (event.target.value === "") {
      setOrderType("");
      setOrder("", orderSelected);
    }else{
      setOrderType(event.target.value);
      setOrderSelected(false)
      setOrder(event.target.value, orderSelected);
    }
  };

  const handleChangeOrderAscending = () => {
    const ascending = !orderSelected;
    setOrder(orderType, ascending);
    setOrderSelected((prevSelected) => !prevSelected);
  };

  const handleChangePriority = (event: SelectChangeEvent) => {
    setFilterByPriority(event.target.value as any);
    if (event.target.value === "") {
      setPriority("");
    } else {
      setPriority(event.target.value);
    }
  };

  const hadleInputFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByTitleOrDescription(event.target.value);
  }

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
          onChange={hadleInputFilter}
        />

        <FormControl className="w-90">
          <InputLabel id="category-select-label">Categories</InputLabel>
          <Select
            name="category"
            labelId="category-select-label"
            id="category-select"
            value={category?.name.toLowerCase() ?? ""}
            label="Categories"
            onChange={handleChangeCategory}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {testCategories.map((cat) => (
              <MenuItem key={cat.id} value={cat.name.toLowerCase()}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="w-90">
          <InputLabel id="priority-select-label">Priority</InputLabel>
          <Select
            name="priority"
            labelId="priority-select-label"
            id="priority-select"
            value={priority}
            label="Priority"
            onChange={handleChangePriority}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
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
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
          </Select>
        </FormControl>

        <ToggleButton
          value="check"
          selected={orderSelected}
          onChange={handleChangeOrderAscending}
          disabled={!orderType === true}
        >
          {orderSelected ? (
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
    </div>
  );
};

export default TaskFilters;
