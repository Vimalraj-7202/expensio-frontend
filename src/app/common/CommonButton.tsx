import React from "react";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ButtonProps {
  label: "save" | "edit" | "delete";
  onClick?: () => void;
}

const CommonButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  let color: "primary" | "secondary" | "error" = "primary";
  let text = "";
  let icon: React.ReactNode = null;

  switch (label) {
    case "save":
      color = "primary";
      text = "Save";
      icon = <SaveIcon />;
      break;

    case "edit":
      color = "secondary";
      text = "Edit";
      icon = <EditIcon />;
      break;

    case "delete":
      color = "error";
      text = "Delete";
      icon = <DeleteIcon />;
      break;
  }

  return (
    <Button sx={{height:'40px',width:'100px',borderRadius:2}}
      variant="contained"
      color={color}
      startIcon={icon}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CommonButton;
