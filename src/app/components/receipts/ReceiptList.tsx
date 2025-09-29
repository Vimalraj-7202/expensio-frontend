"use client";
import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const docs = [
  { name: "receipt1.pdf", time: "2025-09-23 10:30 AM" },
  { name: "invoice_food.pdf", time: "2025-09-23 11:15 AM" },
  { name: "shopping_bill.pdf", time: "2025-09-23 12:45 PM" },
];

const ReceiptList = () => {
  return (
    <Box
      sx={{
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        p: 2,
        width: "100%",
        mt:2
      }}
    >
      <Typography sx={{ fontSize: "18px", fontWeight: 600, mb: 2 }}>
        Uploaded Receipts
      </Typography>

      {docs.length === 0 ? (
        <Typography sx={{ color: "gray" }}>No receipts uploaded yet.</Typography>
      ) : (
        <List>
          {docs.map((doc, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={doc.name}
                  secondary={`Uploaded at: ${doc.time}`}
                  primaryTypographyProps={{ fontSize: "15px", fontWeight: 500 }}
                  secondaryTypographyProps={{ fontSize: "13px", color: "gray" }}
                />
              </ListItem>
              {index < docs.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ReceiptList;
