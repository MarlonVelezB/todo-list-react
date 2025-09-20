import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { type FieldError } from "react-hook-form";

interface InputFieldProps {
  label: string;
  type?: string;
  error?: FieldError;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
  rows?: number;
  maximumCharacters?: number;
  countCharacters?: boolean;
  name: string; // Viene del register
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Del register
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void; // Del register
}

const InputComponent = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, onChange, maximumCharacters, countCharacters, ...props }, ref) => {
    const [numberCharacters, setNumberCharacters] = useState(0);

    const handleChangeDescription = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const { value } = event.target;

      // Limitar la longitud sin mutar directamente el target
      const newValue = value.slice(0, maximumCharacters!);

      // Actualizar el input de manera controlada
      event.target.value = newValue;

      // Actualizar contador
      setNumberCharacters(newValue.length);
    };

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
          <TextField
            fullWidth
            error={!!error}
            inputRef={ref} // MUI usa inputRef en lugar de ref
            onChange={(e: any) => {
              handleChangeDescription(e);
            }}
            variant="outlined"
            {...props}
          />
          {countCharacters && (
            <div className="flex mt-1 justify-end">
              <small>
                {numberCharacters}/{maximumCharacters}
              </small>
            </div>
          )}
        </div>

        {error && error.message && (
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        )}
      </div>
    );
  }
);

export default InputComponent;
