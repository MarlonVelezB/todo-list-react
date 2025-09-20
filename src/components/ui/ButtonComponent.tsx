import { Button } from "@mui/material";
import type React from "react";

interface ButtonComponentProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "text" | "outlined" | "contained";
  style?: "sucess" | "error" | "primary" | "secondary" | "error-text";
  label?: string;
  icon?: React.ReactNode;
}

const ButtoComponent: React.FC<ButtonComponentProps> = ({
  type,
  variant,
  style,
  label,
  icon,
  onClick,
}) => {
  const getStyle = () => {
    switch (style) {
      case "sucess":
        return {
          backgroundColor: "#10b981",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#059669",
          },
        };
      case "error":
        return {
          backgroundColor: "#ef4444",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#dc2626",
          },
        };

      case "error-text":
        return {
          color: "black",
          border: "1px solid #f8f9fa",
          "&:hover": {
            color: "#fff",
            backgroundColor: "#ef4444", //
          },
        };
      case "primary":
        return {
          backgroundColor: "#3b82f6",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#2563eb",
          },
        };
      case "secondary":
        return {
          backgroundColor: "#6b7280",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#4b5563",
          },
        };
      default:
        return {
          backgroundColor: "#3b82f6",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#2563eb",
          },
        };
    }
  };

  return (
    <Button type={type} variant={variant} sx={getStyle()} onClick={onClick}>
      {icon && icon}
      <span className="ml-2">{label}</span>
    </Button>
  );
};

export default ButtoComponent;
