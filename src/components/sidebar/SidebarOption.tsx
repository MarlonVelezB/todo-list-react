import { useNavigate } from "react-router-dom";
import type { SidebarMenuOption } from "../componentTypes";
import "./Sidebar.css";
// Importamos React para el tipo de eventos de teclado
import type { KeyboardEvent } from "react";

// Extendemos la interfaz para incluir la prop isActive
interface SidebarOptionProps extends SidebarMenuOption {
  isActive?: boolean;
}

const SidebarOption: React.FC<SidebarOptionProps> = ({ 
  label, 
  path, 
  icon,
  isActive = false // Valor por defecto
}) => {
  const navigate = useNavigate();

  const handleOptionClick = (path: string) => {
    navigate(path);
  };

  // Manejador para eventos de teclado (accesibilidad)
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, path: string) => {
    // Enter y Space deben activar la navegación
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevenir scroll en Space
      handleOptionClick(path);
    }
  };

  // Generamos las clases CSS dinámicamente
  const getClasses = (): string => {
    let classes = "sidebar-option";
    if (isActive) {
      classes += " sidebar-option--active";
    }
    return classes;
  };

  return (
    <div 
      className={getClasses()}
      onClick={() => handleOptionClick(path)}
      onKeyDown={(event) => handleKeyDown(event, path)}
      // Accesibilidad: hacemos el elemento focuseable y navegable por teclado
      role="button"
      tabIndex={0}
      // aria-label proporciona contexto para lectores de pantalla
      aria-label={`Navigate to ${label}`}
      // aria-current indica la página actual
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Envolvemos el icono en un span para mejor control de estilos */}
      <span className="sidebar-option__icon" aria-hidden="true">
        {icon}
      </span>
      
      {/* El texto del label */}
      <span className="sidebar-option__label">
        {label}
      </span>
    </div>
  );
};

export default SidebarOption;