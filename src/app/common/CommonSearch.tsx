import React from "react";
import { TextField, Box } from "@mui/material";

interface CommonFilterProps {
  query: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CommonSearch = ({
  query,
  onChange,
  placeholder = "Search...",
}: CommonFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        sx={{
          width: 300,
          height: 50,
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            height: "100%",
            "& fieldset": {
              borderColor: "#14ab78", 
            },
            "&:hover fieldset": {
              borderColor: "#14ab78", 
            },
            "&.Mui-focused fieldset": {
              borderColor: "#14ab78", 
              boxShadow: "none",
            },
          },
          "& .MuiOutlinedInput-input": {
            height: "100%",
            padding: "0 14px",
          },
        }}
      />
    </Box>
  );
};

export default CommonSearch;
