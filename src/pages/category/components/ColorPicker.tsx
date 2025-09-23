import { FaCheck } from "react-icons/fa";
import { colorMap } from "../../../testData";

interface ColorPickerProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  name?: string;
  size?: number;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  value = null,
  onChange,
  size = 40,
}) => {
  const handleColorSelect = (colorValue: string) => {
    // Si ya está seleccionado, lo deselecciona, si no lo selecciona
    onChange?.(value === colorValue ? null : colorValue);
  };

  const getContrastColor = (hexColor: string): string => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  return (
    <div>
      <label
        className="block text-sm font-medium text-foreground mb-2"
        htmlFor="icon-selector"
      >
        Select a color
      </label>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {Object.entries(colorMap).map(([colorKey, colorValue]) => (
          <div
            key={colorKey}
            onClick={() => handleColorSelect(colorValue)}
            style={{
              width: size,
              height: size,
              backgroundColor: colorValue,
              borderRadius: "50%",
              cursor: "pointer",
              border:
                value === colorKey
                  ? "3px solid #1976d2"
                  : "2px solid transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease-in-out",
              transform: "scale(1)",
              boxShadow:
                value === colorKey
                  ? "0 0 0 2px rgba(25, 118, 210, 0.2)"
                  : "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            aria-label={`Select ${colorKey} color`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleColorSelect(colorValue);
              }
            }}
          >
            {value === colorValue && (
              <FaCheck size={size * 0.4} color={getContrastColor(colorValue)} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
