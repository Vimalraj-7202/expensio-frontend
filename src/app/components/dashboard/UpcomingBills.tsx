"use client";
import { Box, Paper, Typography, Divider, Chip } from "@mui/material";
import React from "react";

// Sample Upcoming Bills Data
const upcomingBills = [
  { id: 1, Bill: "Electricity", DueDate: "25-09-2025", Amount: "₹1200", Status: "Pending" },
  { id: 2, Bill: "Netflix", DueDate: "30-09-2025", Amount: "₹450", Status: "Auto-Debit" },
  { id: 3, Bill: "Credit Card", DueDate: "28-09-2025", Amount: "₹3500", Status: "Pending" },
  { id: 4, Bill: "Internet", DueDate: "27-09-2025", Amount: "₹800", Status: "Pending" },
  { id: 5, Bill: "Gym", DueDate: "29-09-2025", Amount: "₹1200", Status: "Paid" },
  { id: 6, Bill: "Water", DueDate: "26-09-2025", Amount: "₹300", Status: "Pending" },
  { id: 7, Bill: "Spotify", DueDate: "30-09-2025", Amount: "₹150", Status: "Auto-Debit" },
];

// Sample Insights Data
const insights = [
  { id: 1, Label: "Total Spent This Month", Value: "₹12,350" },
  { id: 2, Label: "Top Category", Value: "Bills" },
  { id: 3, Label: "Biggest Expense", Value: "Flight — ₹1500" },
  { id: 4, Label: "Upcoming Bills Count", Value: "4" },
  { id: 5, Label: "Upcoming Expense Count", Value: "4" },
  { id: 6, Label: "Upcoming Bills Count", Value: "4" },
  { id: 7, Label: "Upcoming Bills Count", Value: "4" },
  { id: 8, Label: "Upcoming Bills Count", Value: "4" },
];

const DashboardTables = () => {
  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {/* Upcoming Bills Paper */}
      <Paper
        sx={{
          flex: 2,
          p: 2,
          borderRadius: "12px",
          minWidth: "250px",
          height: "300px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography>Upcoming Bills</Typography>

        {/* Table Header */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", color: "gray", pb: 1 }}>
          <Box>Due Date</Box>
          <Box>Bill</Box>
          <Box>Amount</Box>
          <Box>Status</Box>
        </Box>
        <Divider />

        {/* Scrollable Table Rows */}
        <Box sx={{ overflowY: "auto", mt: 1 }}>
          {upcomingBills.map((bill) => (
            <Box
              key={bill.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                py: 1,
                borderBottom: "1px solid #f0f0f0",
                alignItems: "center",
              }}
            >
              <Box>{bill.DueDate}</Box>
              <Box>{bill.Bill}</Box>
              <Box>{bill.Amount}</Box>
              <Chip
                label={bill.Status}
                size="small"
                color={
                  bill.Status === "Pending" ? "warning" : bill.Status === "Paid" ? "success" : "info"
                }
                sx={{ width: "80px", fontSize: "0.7rem" }}
              />
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Insights Paper */}
      <Paper
        sx={{
          flex: 1,
          p: 2,
          borderRadius: "12px",
          minWidth: "230px",
          height: "300px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography>Insights</Typography>

        {/* Scrollable Table Rows */}
        <Box sx={{ overflowY: "auto", mt: 1 }}>
          {insights.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 1,
                borderBottom: "1px solid #f0f0f0",
                alignItems: "center",
              }}
            >
              <Typography color="gray">{item.Label}</Typography>
              <Typography>{item.Value}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardTables;
