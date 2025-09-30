"use client";
import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  useTheme,
} from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const docs = [
  { name: "receipt1.pdf", time: "2025-09-23 10:30 AM" },
  { name: "invoice_food.pdf", time: "2025-09-23 11:15 AM" },
  { name: "shopping_bill.pdf", time: "2025-09-23 12:45 PM" },
];

const ReceiptList = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "10px",
        p: 2,
        width: "100%",
        mt: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography sx={{ fontSize: "18px", fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
        Uploaded Receipts
      </Typography>

      {docs.length === 0 ? (
        <Typography sx={{ color: theme.palette.text.secondary }}>
          No receipts uploaded yet.
        </Typography>
      ) : (
        <List>
          {docs.map((doc, index) => (
            <React.Fragment key={index}>
              <ListItem
                secondaryAction={
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      edge="end"
                      size="small"
                      sx={{ color: theme.palette.primary.main }}
                      onClick={() => alert(`Preview ${doc.name}`)}
                    >
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      size="small"
                      sx={{ color: theme.palette.primary.main }}
                      onClick={() => alert(`Download ${doc.name}`)}
                    >
                      <FileDownloadOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemIcon>
                  <PictureAsPdfOutlinedIcon sx={{ color: theme.palette.error.main }} />
                </ListItemIcon>
                <ListItemText
                  primary={doc.name}
                  secondary={`Uploaded at: ${doc.time}`}
                  primaryTypographyProps={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                  }}
                  secondaryTypographyProps={{
                    fontSize: "13px",
                    color: theme.palette.text.secondary,
                  }}
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
