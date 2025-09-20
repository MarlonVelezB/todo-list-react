import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import React from "react";
import { type FieldError } from "react-hook-form";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectFieldProps {
  label: string;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  options: SelectOption[];
  name: string;
  onChange: (event: SelectChangeEvent<string | number>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string | number;
}

const SelectComponent = React.forwardRef<any, SelectFieldProps>(
  ({ label, error, options, placeholder = "Selecciona una opción", value, onChange, onBlur, name, ...props }, ref) => {
    return (
      <div className="w-full">
        <label
          className={`block text-sm font-medium text-foreground mb-2 ${
            !!error && "text-red-500"
          }`}
        >
          {props.required && <span className="text-red-500 font-medium">*</span>}{label}:
        </label>
        <div>
          <Select
            fullWidth
            error={!!error}
            inputRef={ref}
            variant="outlined"
            displayEmpty
            value={value || ""} // Asegurar que nunca sea undefined
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            {...props}
          >
            {placeholder && (
              <MenuItem value="" disabled>
                {placeholder}
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem 
                key={option.value} 
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </div>

        {error && error.message && (
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        )}
      </div>
    );
  }
);

SelectComponent.displayName = "SelectComponent";

export default SelectComponent;