// Tipos originales para referencia (comentados)
/*
CÓDIGO ANTERIOR:
export interface SidebarMenuOption {
  label: string;
  path: string;
  icon?: React.ReactNode;
  children?: SidebarMenuOption[];
}
*/

// NUEVO CÓDIGO MEJORADO:
import { type ReactNode } from "react";

export interface SidebarMenuOption {
  /** Texto que se muestra en la opción del menú */
  label: string;
  
  /** Ruta a la que navega cuando se hace click */
  path: string;
  
  /** Icono opcional que se muestra junto al label */
  icon?: ReactNode;
  
  /** 
   * Array de sub-opciones para crear un dropdown
   * Si está presente, esta opción se renderiza como dropdown
   */
  children?: SidebarMenuOption[];
  
  /** 
   * Indica si esta opción está activa (página actual)
   * Se calcula automáticamente basado en la ruta actual
   */
  isActive?: boolean;
  
  /** 
   * Clase CSS adicional para personalización específica
   * Opcional para casos de uso especiales
   */
  className?: string;
  
  /** 
   * Función callback opcional que se ejecuta al hacer click
   * Si no se proporciona, usa la navegación por defecto
   */
  onClick?: (path: string) => void;
  
  /** 
   * Indica si esta opción debe estar deshabilitada
   * Útil para opciones que requieren permisos específicos
   */
  disabled?: boolean;
  
  /** 
   * Badge o contador opcional que se muestra junto al label
   * Útil para mostrar notificaciones o conteos
   */
  badge?: string | number;
  
  /** 
   * Tooltip opcional que aparece al hacer hover
   * Para proporcionar información adicional
   */
  tooltip?: string;
}

// Tipos adicionales para mejor organización

/** Props extendidas para componentes que manejan estado activo */
export interface SidebarOptionWithState extends SidebarMenuOption {
  isActive: boolean;
}

/** Props para el dropdown con información de ruta actual */
export interface SidebarDropdownProps extends SidebarMenuOption {
  isActive?: boolean;
  currentPath?: string;
  /** Indica si el dropdown debe estar inicialmente abierto */
  defaultOpen?: boolean;
}

/** Configuración general del sidebar */
export interface SidebarConfig {
  /** Título del sidebar */
  title?: string;
  /** Si el sidebar es colapsable */
  collapsible?: boolean;
  /** Estado inicial colapsado */
  defaultCollapsed?: boolean;
  /** Ancho personalizado del sidebar */
  width?: number | string;
  /** Tema del sidebar */
  theme?: 'light' | 'dark' | 'auto';
}

/** Eventos del sidebar */
export interface SidebarEvents {
  /** Se ejecuta cuando cambia la navegación */
  onNavigate?: (path: string, option: SidebarMenuOption) => void;
  /** Se ejecuta cuando se colapsa/expande */
  onToggleCollapse?: (collapsed: boolean) => void;
  /** Se ejecuta cuando se abre/cierra un dropdown */
  onToggleDropdown?: (path: string, isOpen: boolean) => void;
}

/** Estados posibles de una opción del sidebar */
export type SidebarOptionState = 'default' | 'active' | 'hover' | 'focus' | 'disabled';

/** Variantes de tamaño para el sidebar */
export type SidebarSize = 'compact' | 'normal' | 'large';

/** Props del contexto del sidebar para compartir estado */
export interface SidebarContextProps {
  /** Configuración actual del sidebar */
  config: SidebarConfig;
  /** Ruta actualmente activa */
  currentPath: string;
  /** Estado de colapso del sidebar */
  isCollapsed: boolean;
  /** Función para cambiar el estado de colapso */
  toggleCollapse: () => void;
  /** Dropdowns actualmente abiertos */
  openDropdowns: string[];
  /** Función para toggle de un dropdown específico */
  toggleDropdown: (path: string) => void;
}

// Utilidades de tipo para casos específicos

/** Extrae solo las opciones que tienen children (dropdowns) */
export type DropdownOption = SidebarMenuOption & {
  children: SidebarMenuOption[];
};

/** Extrae solo las opciones simples (sin children) */
export type SimpleOption = SidebarMenuOption & {
  children?: never;
};

/** Union type para distinguir entre tipos de opciones */
export type SidebarOptionType = DropdownOption | SimpleOption;

/** Props compartidas para todos los componentes del sidebar */
export interface BaseSidebarProps {
  /** Clase CSS personalizada */
  className?: string;
  /** ID único del componente */
  id?: string;
  /** Props de accesibilidad adicionales */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'data-testid'?: string;
}