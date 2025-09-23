import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { iconMap } from "../../../testData";

interface IconSelectorProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  name?: string;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  value = null,
  onChange,
}) => {
  const handleIconChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    // Notifica a RHF del cambio directamente con la key
    onChange?.(newValue);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2" htmlFor="icon-selector">Select an icon</label>
      <ToggleButtonGroup
        id="icon-selector"
        value={value} // ← string o null
        exclusive
        onChange={handleIconChange} // ← Ahora recibe string | null
        aria-label="icon selector"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {Object.entries(iconMap).map(([iconKey, IconComponent]) => (
          <ToggleButton
            key={iconKey}
            value={iconKey} // ← Usa la key como valor
            aria-label={`icon-${iconKey}`}
          >
            <IconComponent size={24} />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default IconSelector;
