import type React from "react";
import "./SidebarFooter.css";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

interface SidebarFooterProps {
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  onHelp?: () => void;
  onProfile?: () => void;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({
  userName = "Usuario",
  userEmail = "usuario@email.com",
  onLogout,
  onHelp,
  onProfile
}) => {
  return (
    <footer className="sidebar-footer" role="contentinfo">
      {/* Información del usuario */}
      <div className="sidebar-footer-user">
        <button
          className="sidebar-footer-user-info"
          onClick={onProfile}
          aria-label={`Perfil de ${userName}`}
        >
          <div className="sidebar-footer-avatar">
            <FaUser />
          </div>
          <div className="sidebar-footer-user-details">
            <span className="sidebar-footer-username">{userName}</span>
            <span className="sidebar-footer-useremail">{userEmail}</span>
          </div>
        </button>
      </div>

      {/* Acciones del footer */}
      <div className="sidebar-footer-actions">
        <button
          className="sidebar-footer-action"
          onClick={onHelp}
          aria-label="Ayuda"
          title="Ayuda"
        >
          <AiFillQuestionCircle />
        </button>
        
        <button
          className="sidebar-footer-action sidebar-footer-logout"
          onClick={onLogout}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
        >
          <IoLogOut />
        </button>
      </div>
    </footer>
  );
};

export default SidebarFooter;