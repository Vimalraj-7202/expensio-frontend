import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

interface DialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  children?: React.ReactNode;
  actionType?: "add" | "delete" | "edit";
  width?: string | number;
  height?: string | number;
  PaperProps?: object;
}

const CommonDialog: React.FC<DialogProps> = ({
  title,
  open,
  onClose,
  onSubmit,
  children,
  actionType,
  width = 400,
  height = "auto",
}) => {
  const renderIcon = () => {
    switch (actionType) {
      case "add":
        return <AddIcon style={{ marginRight: 8, color: "#14ab78" }} />;
      case "delete":
        return <DeleteIcon style={{ marginRight: 8, color: "red" }} />;
      case "edit":
        return <EditIcon style={{ marginRight: 8, color: "orange" }} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: width,
          height: height,
          p: 2,
          borderRadius: 5,
          position: "relative",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 1,
        }}
      >
        <Box display="flex" alignItems="center">
          {renderIcon()}
          {title}
        </Box>

        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>{children}</DialogContent>

      <DialogActions>
        {onSubmit && (
          <Button
            sx={{
              color: "white",
              backgroundColor: "#14ab78",
              height: "35px",
              width: "60px",
              borderRadius: "12px",
              textTransform: "none",
            }}
            onClick={onSubmit}
          >
            {actionType === "add" && "Save"}
            {actionType === "edit" && "Update"}
            {actionType === "delete" && "Delete"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CommonDialog;
