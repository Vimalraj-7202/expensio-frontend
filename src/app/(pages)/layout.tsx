"use client";
import React from "react";
import Sidebar from "../components/Layouts/Sidebar";
import {Box} from "@mui/material";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Expense", path: "/expense" },
  { label: "Receipts", path: "/receipts" },
  { label: "Reports", path: "/reports" },
  { label: "Notifications", path: "/notifications" },
  { label: "Settings", path: "/settings" },
  {label:"Admin",path:"/admin"}
];
const Layout = ({ children }: any) => {
  const pathname = usePathname();
  const sidebarWidth = 230;

  const currentPage = menuItems.find((item: any) =>
    pathname.startsWith(item.path)
  );
  const pageTitle = currentPage?.label || "";

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          bgcolor: "grey.100",
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
          marginLeft: "230px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f2f1f5ff",
          color: "black",
          overflow: "auto",
          boxSizing: "border-box"
        }}
      >
        <Box>
          {/* <Typography sx={{ fontWeight: "bold" }}>{pageTitle}</Typography> */}
        </Box>
        <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
