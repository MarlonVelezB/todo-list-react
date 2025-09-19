import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
  IconButton,
  Typography,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useCallback, useState, type ReactNode } from "react";
import { IoClose } from "react-icons/io5";

// Transición personalizable
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Interfaces más robustas
interface DialogAction {
  label: string;
  onClick: () => void;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  disabled?: boolean;
}

interface DialogComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  content?: string | ReactNode;
  actions?: DialogAction[];
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  showCloseButton?: boolean;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  keepMounted?: boolean;
  className?: string;
  "aria-describedby"?: string;
}

const DialogComponent = ({
  open,
  onClose,
  title,
  content,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  showCloseButton = true,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  keepMounted = false,
  className,
  "aria-describedby": ariaDescribedBy,
}: DialogComponentProps) => {

  const handleClose = (reason?: string) => {
    // Prevenir cierre si está deshabilitado
    if (reason === "backdropClick" && disableBackdropClick) return;
    if (reason === "escapeKeyDown" && disableEscapeKeyDown) return;
    
    onClose();
  };

  // Acciones por defecto si no se proporcionan
  // const defaultActions: DialogAction[] = [
  //   {
  //     label: "Cancelar",
  //     onClick: onClose,
  //     variant: "text",
  //   },
  //   {
  //     label: "Aceptar",
  //     onClick: onClose,
  //     variant: "contained",
  //     color: "primary",
  //   },
  // ];

  // const dialogActions = actions || defaultActions;

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => handleClose(reason)}
      slots={{
        transition: Transition,
      }}
      slotProps={{
        transition: {
          timeout: 300,
        },
      }}
      keepMounted={keepMounted}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      className={className}
      aria-describedby={ariaDescribedBy || "dialog-description"}
    >
      {/* Header con título y botón de cerrar opcional */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" component="div">
          {title || "Confirmación"}
        </Typography>
        
        {showCloseButton && (
          <IconButton
            aria-label="cerrar"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <IoClose />
          </IconButton>
        )}
      </DialogTitle>

      {/* Contenido */}
      {content && (
        <DialogContent>
          {typeof content === "string" ? (
            <DialogContentText
              id={ariaDescribedBy || "dialog-description"}
              sx={{ minHeight: "60px" }}
            >
              {content}
            </DialogContentText>
          ) : (
            <div id={ariaDescribedBy || "dialog-description"}>
              {content}
            </div>
          )}
        </DialogContent>
      )}

      {/* Acciones */}
      {/* <DialogActions sx={{ px: 3, pb: 2 }}>
        {dialogActions.map((action, index) => (
          <Button
            key={`${action.label}-${index}`}
            onClick={action.onClick}
            variant={action.variant || "text"}
            color={action.color || "primary"}
            disabled={action.disabled}
            sx={{ minWidth: "80px" }}
          >
            {action.label}
          </Button>
        ))}
      </DialogActions> */}
    </Dialog>
  );
};

export default DialogComponent;

// Hook personalizado para facilitar el uso
export const useDialog = (initialState = false) => {
  const [open, setOpen] = useState(initialState);

  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);
  
  return {
    open,
    openDialog,
    closeDialog,
  };
};