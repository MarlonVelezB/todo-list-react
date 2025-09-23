import { Button } from "@mui/material";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface SectionComponentProps {
  title: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  enableAcctionButton?: boolean;
  showAcctionButton?: boolean;
  iconButton?: React.ReactNode;
  colorButton?: string;
  textButton?: string;
  onClickButton?: () => void;
  className?: string;
}

const SectionComponent: React.FC<SectionComponentProps> = ({
  title,
  content,
  children,
  collapsible = false,
  defaultCollapsed = false,
  enableAcctionButton = true,
  className = "",
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const renderContent = () => {
    if (children) return children;
    if (content) return content;
    return null;
  };

  const hasContent = children || content;

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 mb-6 ${className}`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between ${
          collapsible && hasContent ? "cursor-pointer" : ""
        }`}
        onClick={
          collapsible && hasContent
            ? () => setIsCollapsed(!isCollapsed)
            : undefined
        }
      >
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

        {props.showAcctionButton && (
          <div>
            <Button
              variant="contained"
              startIcon={props.iconButton}
              onClick={(e) => {
                e.stopPropagation(); // Esto evita que se ejecute el onClick del div padre
                props.onClickButton?.(); // Ejecuta la función del botón
              }}
              style={{
                color: "#fff",
                backgroundColor: props.colorButton,
                textTransform: "none",
              }}
              disabled={!enableAcctionButton}
            >
              {props.textButton}
            </Button>
          </div>
        )}

        {collapsible && hasContent && (
          <div className="p-1 rounded-md hover:bg-gray-100 transition-colors">
            {isCollapsed ? (
              <MdKeyboardArrowDown className="w-5 h-5 text-gray-500" />
            ) : (
              <MdKeyboardArrowUp className="w-5 h-5 text-gray-500" />
            )}
          </div>
        )}
      </div>

      {/* Content */}
      {hasContent && (
        <div
          className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${
            isCollapsed
              ? "max-h-0 opacity-0 mt-0"
              : "max-h-none opacity-100 mt-4"
          }
        `}
        >
          <div className="text-gray-700 leading-relaxed">{renderContent()}</div>
        </div>
      )}
    </div>
  );
};

export default SectionComponent;
