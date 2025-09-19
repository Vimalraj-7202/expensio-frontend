"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/app/hooks/redux";
import {SpaceDashboardOutlined,SettingsOutlined,LogoutOutlined,NotificationsActiveOutlined,AdfScannerOutlined,ReceiptLong,CreditCard,AdminPanelSettings} from "@mui/icons-material";

const iconSize = 24;
const Sidebar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const normalizedRole = user?.role;

  const menuItems = [
    {
      label: "Dashboard",
      icon: <SpaceDashboardOutlined />,
      path: "/dashboard",
      roles: ["admin", "user"],
    },
    {
      label: "Expense",
      icon: <CreditCard />,
      path: "/expense",
      roles: ["admin", "user"],
    },
    {
      label: "Receipts",
      icon: <ReceiptLong />,
      path: "/receipts",
      roles: ["admin", "user"],
    },
    {
      label: "Reports",
      icon: <AdfScannerOutlined />,
      path: "/reports",
      roles: ["admin", "user"],
    },
    {
      label: "Notifications",
      icon: <NotificationsActiveOutlined />,
      path: "/notifications",
      roles: ["admin", "user"],
    },
    {
      label: "Settings",
      icon: <SettingsOutlined />,
      path: "/settings",
      roles: ["admin", "user"],
    },
    {
      label: "Admin",
      icon: <AdminPanelSettings />,
      path: "/admin",
      roles: ["admin"],
    },
  ];

  const handleLogout = () => {
    router.push("/auth/login");
  };

  if (!normalizedRole) return null;

  return (
    <Box
      sx={{
        width: 230,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        p: 1,
        position: "fixed",
        left: 0,
        top: 0,
        boxShadow: "2px 0 6px rgba(0,0,0,0.05)",
      }}
    >
      {/* Menu Items */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {menuItems
          .filter((item) => item.roles.includes(normalizedRole))
          .map((item, index) => {
            const isActive = pathname.startsWith(item.path);
            return (
              <Box
                key={index}
                onClick={() => router.push(item.path)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.2,
                  borderRadius: "8px",
                  cursor: "pointer",
                  bgcolor: isActive ? "#14ab78" : "transparent",
                  color: isActive ? "white" : "gray",
                  transition: "0.2s",
                  "&:hover": {
                    bgcolor: isActive ? "#14ab78" : "#f0f0f0",
                    color: isActive ? "white" : "black",
                  },
                }}
              >
                {React.cloneElement(item.icon, {
                  sx: {
                    fontSize: iconSize,
                    color: isActive ? "white" : "gray",
                  },
                })}
                <Typography fontSize={15} fontWeight={500}>
                  {item.label}
                </Typography>
              </Box>
            );
          })}
      </Box>

      {/* Logout Button */}
      <Box
        onClick={handleLogout}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          p: 1.2,
          borderRadius: "8px",
          cursor: "pointer",
          color: "gray",
          transition: "0.2s",
          "&:hover": {
            bgcolor: "#f0f0f0",
            color: "black",
          },
        }}
      >
        <LogoutOutlined sx={{ fontSize: iconSize }} />
        <Typography fontSize={15} fontWeight={500}>
          Logout
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
