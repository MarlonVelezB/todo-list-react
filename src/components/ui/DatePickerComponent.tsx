import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type { FieldError } from "react-hook-form";

interface DatePickerProps {
  label: string;
  error?: FieldError;
  placeholder?: string;
  name: string;
  format?: string;
  required?: boolean;
  onChange: (value: Date | null) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: Date | null;
}
const DatePickerComponent = React.forwardRef<any, DatePickerProps>(
  ({ label, error, name, value, format = "dd/MM/yyyy", onChange, required }, ref) => {
    return (
      <div className="w-full">
        <label
          className={`block text-sm font-medium text-foreground mb-2 ${
            !!error && "text-red-500"
          }`}
        >
          {required && <span className="text-red-500 font-medium">*</span>}{label}:
        </label>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DatePicker
            name={name}
            value={value || null}
            format={format}
            className="w-full"
            inputRef={ref}
            onChange={onChange}
          />
        </LocalizationProvider>

        {error && error.message && (
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        )}
      </div>
    );
  }
);

export default DatePickerComponent;
