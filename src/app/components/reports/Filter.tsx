"use client";
import {
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useTheme } from "@mui/material/styles";

const Filter = () => {
  const [range, setRange] = useState("30");
  const [category, setCategory] = useState("");
  const theme = useTheme();

  const ranges = [
    { label: "Last 7 days", value: "7" },
    { label: "Last 14 days", value: "14" },
    { label: "Last 30 days", value: "30" },
  ];

  const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment"];

  const handleExport = () => {
    alert(`Exporting CSV for ${category || "All"} in last ${range} days`);
  };

  return (
    <Box
      sx={{
        width: "100%",
        border: `2px solid ${theme.palette.divider}`,
        borderRadius: 3,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: theme.palette.background.paper
      }}
    >
      <Typography
        sx={{ fontSize: "15px", fontWeight: 600, color: theme.palette.text.primary }}
      >
        Filters
      </Typography>

      {/* Single row with 3 elements */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {/* Range */}
        <FormControl size="small" sx={{ flex: 1, minWidth: 120 }}>
          <InputLabel>Range</InputLabel>
          <Select
            value={range}
            label="Range"
            onChange={(e) => setRange(e.target.value)}
            sx={{ height: 45, borderRadius: 2 }}
          >
            {ranges.map((r) => (
              <MenuItem key={r.value} value={r.value}>
                {r.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Category */}
        <FormControl size="small" sx={{ flex: 1, minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
            sx={{ height: 45, borderRadius: 2 }}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Export Button */}
        <Button
          onClick={handleExport}
          sx={{
            flex: 1,
            height: 45,
            minWidth: 120,
            textTransform: "none",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            backgroundColor: theme.palette.primary.main, 
            color: theme.palette.primary.contrastText, 
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          <FileDownloadOutlinedIcon sx={{ fontSize: 20 }} />
          Export CSV
        </Button>
      </Box>
    </Box>
  );
};

export default Filter;
