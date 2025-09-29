"use client";
import React from "react";
import Sidebar from "../components/Layouts/Sidebar";
import { Box, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useTheme as useMuiTheme } from "@mui/material/styles";

const menuItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Expense", path: "/expense" },
  { label: "Receipts", path: "/receipts" },
  { label: "Reports", path: "/reports" },
  { label: "Notifications", path: "/notifications" },
  { label: "Settings", path: "/settings" },
  { label: "Admin", path: "/admin" },
];

const Layout = ({ children }: any) => {
  const pathname = usePathname();
  const sidebarWidth = 230;
  const muiTheme = useMuiTheme();

  const currentPage = menuItems.find((item: any) => pathname.startsWith(item.path));
  const pageTitle = currentPage?.label || "";

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          bgcolor: muiTheme.palette.background.paper,
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: `${sidebarWidth}px`,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: muiTheme.palette.background.default,
          color: muiTheme.palette.text.primary, 
          overflow: "auto",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
