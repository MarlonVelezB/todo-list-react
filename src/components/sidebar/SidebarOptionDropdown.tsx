import { useState } from "react";
import type { SidebarMenuOption } from "../componentTypes";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
// Importamos React para tipos de eventos
import type { KeyboardEvent } from "react";

// Extendemos la interfaz para incluir las nuevas props
interface SidebarOptionDropdownProps extends SidebarMenuOption {
  isActive?: boolean;
  currentPath?: string;
}

const SidebarOptionDropdown: React.FC<SidebarOptionDropdownProps> = ({
  children,
  label,
  icon,
  isActive = false,
  currentPath = ""
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleCollapseMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (path: string) => {
    navigate(path);
  };

  // Manejador de teclado para el elemento principal del dropdown
  const handleMainKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCollapseMenu();
    }
    // Flecha hacia abajo abre el menú
    else if (event.key === 'ArrowDown' && !isDropdownOpen) {
      event.preventDefault();
      setIsDropdownOpen(true);
    }
    // Flecha hacia arriba cierra el menú
    else if (event.key === 'ArrowUp' && isDropdownOpen) {
      event.preventDefault();
      setIsDropdownOpen(false);
    }
  };

  // Manejador de teclado para items del submenu
  // Mejora la accesibilidad permitiendo navegación por teclado
  const handleSubmenuKeyDown = (event: KeyboardEvent<HTMLLIElement>, path: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOptionClick(path);
    }
  };

  // Función para generar clases CSS del elemento principal
  const getMainClasses = (): string => {
    let classes = "sidebar-option dropdown";
    if (isDropdownOpen) {
      classes += " sidebar-option--dropdown-open";
    }
    if (isActive) {
      classes += " sidebar-option--active";
    }
    return classes;
  };

  // Función para verificar si un item del submenu está activo
  const isSubmenuItemActive = (itemPath: string): boolean => {
    return currentPath === itemPath;
  };

  return (
    <div className="sidebar-dropdown">
      <div 
        onClick={handleCollapseMenu}
        onKeyDown={handleMainKeyDown}
        className={getMainClasses()}
        // Accesibilidad para dropdowns
        role="button"
        tabIndex={0}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        aria-label={`${label} menu, ${isDropdownOpen ? 'expanded' : 'collapsed'}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {/* Icono principal */}
        <span className="sidebar-option__icon" aria-hidden="true">
          {icon}
        </span>
        
        {/* Label del dropdown */}
        <span className="sidebar-option__label">
          {label}
        </span>
        
        {/* Icono de expansión/colapso */}
        <span className="sidebar-option__dropdown-icon" aria-hidden="true">
          {isDropdownOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
        </span>
      </div>

      {isDropdownOpen && (
        <div 
          className="sidebar-submenu-container"
          // aria-hidden se maneja automáticamente por el estado isDropdownOpen
        >
          <ul 
            className="sidebar-submenu"
            role="menu"
            aria-label={`${label} submenu`}
          >
            {children?.map((option, index) => {
              const isItemActive = isSubmenuItemActive(option.path);
              return (
                <li
                  key={`${option.path}-${index}`} // Key única para cada item
                  onClick={() => handleOptionClick(option.path)}
                  onKeyDown={(event) => handleSubmenuKeyDown(event, option.path)}
                  className={`sidebar-submenu__item ${isItemActive ? 'sidebar-submenu__item--active' : ''}`}
                  role="menuitem"
                  tabIndex={0}
                  aria-label={`Navigate to ${option.label}`}
                  aria-current={isItemActive ? 'page' : undefined}
                >
                  {/* Si el item tiene icono, lo mostramos */}
                  {option.icon && (
                    <span className="sidebar-submenu__icon" aria-hidden="true">
                      {option.icon}
                    </span>
                  )}
                  
                  {/* Label del item del submenu */}
                  <span className="sidebar-submenu__label">
                    {option.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarOptionDropdown;