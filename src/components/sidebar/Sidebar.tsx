import type React from "react";
import "./Sidebar.css";
import type { SidebarMenuOption } from "../componentTypes";
import {
  AiFillHome,
  AiFillSetting,
} from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import SidebarOption from "./SidebarOption";
import SidebarOptionDropdown from "./SidebarOptionDropdown";
import SidebarFooter from "./SidebarFooter"; // Importamos el nuevo footer
// Importamos useLocation para detectar la ruta actual y marcar el elemento activo
import { useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  // Hook para obtener la ubicación actual de la ruta
  const location = useLocation();

  const options: SidebarMenuOption[] = [
    { label: "Home", path: "/", icon: <AiFillHome /> },
    { label: "Category", path: "/categories", icon: <BiSolidCategory /> },
    {
      label: "Settings",
      path: "/settings",
      icon: <AiFillSetting />,
      children: [
        { label: "Profile", path: "/settings/profile" },
      ],
    },
  ];

  // Función para determinar si una opción está activa
  const isOptionActive = (option: SidebarMenuOption): boolean => {
    // Si tiene hijos, verificamos si alguna ruta hija coincide
    if (option.children) {
      return option.children.some(child => child.path === location.pathname) || 
             option.path === location.pathname;
    }
    // Para opciones simples, comparamos directamente
    return option.path === location.pathname;
  };

  // Funciones para manejar las acciones del footer
  const handleLogout = () => {
    // Implementa aquí la lógica de logout
    console.log("Cerrando sesión...");
  };

  const handleHelp = () => {
    // Implementa aquí la lógica para mostrar ayuda
    console.log("Mostrando ayuda...");
  };

  const handleProfile = () => {
    // Implementa aquí la navegación al perfil
    console.log("Navegando al perfil...");
  };

  return (
    // Agregamos role="navigation" para accesibilidad
    // aria-labelledby conecta el sidebar con su título para lectores de pantalla (accesibilidad a personas con discapacidad visual)
    <nav className="sidebar" role="navigation" aria-label="Main navigation">
      {/* Usamos h2 con id para que pueda ser referenciado por aria-labelledby */}
      <h2 id="sidebar-title" className="sidebar-title">Navigation</h2>

      {/* aria-labelledby conecta la lista con el título del sidebar */}
      <ul className="sidebar-menu" aria-labelledby="sidebar-title">
        {options.map((option, index) => {
          // Creamos una key única combinando path e index para evitar colisiones
          const uniqueKey = `${option.path}-${index}`;
          // Determinamos si esta opción está activa
          const isActive = isOptionActive(option);
          
          return option.children ? (
            // Key movida al <li> que es el elemento que React renderiza en la lista
            <li key={uniqueKey} className="sidebar-menu-item">
              <SidebarOptionDropdown 
                {...option} 
                isActive={isActive}
                // Pasamos el pathname actual para que el dropdown pueda marcar subelementos activos
                currentPath={location.pathname}
              />
            </li>
          ) : (
            <li key={uniqueKey} className="sidebar-menu-item">
              <SidebarOption 
                {...option} 
                isActive={isActive}
              />
            </li>
          );
        })}
      </ul>

      {/* Nuevo footer del sidebar */}
      <SidebarFooter
        userName="Juan Pérez"
        userEmail="juan.perez@empresa.com"
        onLogout={handleLogout}
        onHelp={handleHelp}
        onProfile={handleProfile}
      />
    </nav>
  );
};

export default Sidebar;