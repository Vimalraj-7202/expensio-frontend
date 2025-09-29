import { Box, Paper, Typography, Divider, Chip } from "@mui/material";
import React from "react";

const RecentData = [
  { id: 1, Date: "20-09-2025", Description: "Coffee", Category: "Food", Amount: "₹250" },
  { id: 2, Date: "19-09-2025", Description: "Uber", Category: "Transport", Amount: "₹120" },
  { id: 3, Date: "18-09-2025", Description: "T-shirt", Category: "Shopping", Amount: "₹600" },
  { id: 4, Date: "17-09-2025", Description: "Electricity", Category: "Bills", Amount: "₹900" },
  { id: 5, Date: "16-09-2025", Description: "Netflix", Category: "Entertainment", Amount: "₹450" },
  { id: 6, Date: "15-09-2025", Description: "Supermarket", Category: "Groceries", Amount: "₹780" },
  { id: 7, Date: "14-09-2025", Description: "Pharmacy", Category: "Health", Amount: "₹300" },
  { id: 8, Date: "13-09-2025", Description: "Flight", Category: "Travel", Amount: "₹1500" },
  { id: 9, Date: "12-09-2025", Description: "Lunch", Category: "Food", Amount: "₹220" },
  { id: 10, Date: "11-09-2025", Description: "Shoes", Category: "Shopping", Amount: "₹1200" },
];

const RecentExpense = () => {
  return (
    <Box>
      <Paper
        sx={{
          height: "300px",
          width: "100%",
          p: 2,
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          mt:0.5
        }}
      >
        <Typography>Recent Expenses</Typography>

        {/* Header Row - fixed */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            color: "gray",
            py: 1
          }}
        >
          <Box>Date</Box>
          <Box>Description</Box>
          <Box>Category</Box>
          <Box textAlign="right">Amount</Box>
        </Box>
        <Divider />

        {/* Scrollable Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {RecentData.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                py: 1,
                borderBottom: "1px solid #f0f0f0",
                alignItems: "center",
              }}
            >
              <Box>{item.Date}</Box>
              <Box>{item.Description}</Box>
              <Chip
                label={item.Category}
                sx={{
                  width: "80px",
                  height: "22px",
                  fontSize: "0.7rem",
                  px: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              />
              <Box textAlign="right">{item.Amount}</Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default RecentExpense;
