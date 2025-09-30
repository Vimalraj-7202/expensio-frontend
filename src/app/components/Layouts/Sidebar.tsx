"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/app/hooks/redux";
import {
  SpaceDashboardOutlined,
  SettingsOutlined,
  LogoutOutlined,
  NotificationsActiveOutlined,
  AdfScannerOutlined,
  ReceiptLong,
  CreditCard,
  AdminPanelSettings,
  AccountBalanceWalletOutlined,
  LightModeOutlined,
  NightlightOutlined,
} from "@mui/icons-material";
import { useTheme as useAppTheme } from "@/app/providers/ThemeProvider";
import { useTheme as useMuiTheme } from "@mui/material/styles";

const iconSize = 24;

const Sidebar = () => {
  const { darkMode, toggleTheme } = useAppTheme();
  const muiTheme = useMuiTheme();
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();
  const normalizedRole = user?.role;
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Load profile image from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setProfileImage(savedImage);
  }, []);

  if (!normalizedRole) return null;

  const menuItems = [
    { label: "Dashboard", icon: <SpaceDashboardOutlined />, path: "/dashboard", roles: ["admin", "user"] },
    { label: "Expense", icon: <CreditCard />, path: "/expense", roles: ["admin", "user"] },
    { label: "Receipts", icon: <ReceiptLong />, path: "/receipts", roles: ["admin", "user"] },
    { label: "Budgets", icon: <AccountBalanceWalletOutlined />, path: "/budgets", roles: ["user"] },
    { label: "Reports", icon: <AdfScannerOutlined />, path: "/reports", roles: ["admin", "user"] },
    { label: "Notifications", icon: <NotificationsActiveOutlined />, path: "/notifications", roles: ["admin", "user"] },
    { label: "Settings", icon: <SettingsOutlined />, path: "/settings", roles: ["admin", "user"] },
    { label: "Admin", icon: <AdminPanelSettings />, path: "/admin", roles: ["admin"] },
  ];

  const handleLogout = () => router.push("/auth/login");

  return (
    <Box
      sx={{
        width: 230,
        backgroundColor: muiTheme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        p: 1,
        position: "fixed",
        left: 0,
        top: 0,
        boxShadow: "2px 0 6px rgba(0,0,0,0.05)",
        color: muiTheme.palette.text.primary,
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
                  bgcolor: isActive ? muiTheme.palette.primary.main : "transparent",
                  color: isActive ? muiTheme.palette.primary.contrastText : muiTheme.palette.text.primary,
                  transition: "0.2s",
                  "&:hover": {
                    bgcolor: isActive ? muiTheme.palette.primary.main : muiTheme.palette.action.hover,
                    color: isActive ? muiTheme.palette.primary.contrastText : muiTheme.palette.text.primary,
                  },
                }}
              >
                {React.cloneElement(item.icon, {
                  sx: { fontSize: iconSize, color: isActive ? "white" : muiTheme.palette.text.secondary },
                })}
                <Typography fontSize={15} fontWeight={500}>
                  {item.label}
                </Typography>
              </Box>
            );
          })}
      </Box>

      {/* User Info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          mt: 1,
          mb: 2,
          mr: 2,
        }}
      >
        <Avatar sx={{ width: 100, height: 100, mb: 1 }} src={profileImage || undefined} />
        <Typography fontWeight={600} fontSize={16}>
          {user.name}
        </Typography>
        <Typography fontSize={13} color={muiTheme.palette.text.secondary}>
          {user.email}
        </Typography>
      </Box>

     {/* Modern Theme Toggle */}
<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
  <Box
    onClick={toggleTheme}
    sx={{
      width: 60,
      height: 28,
      borderRadius: 14,
      backgroundColor: darkMode ? "#333" : "#ddd",
      position: "relative",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 4px",
      transition: "background-color 0.3s",
    }}
  >
    {/* Sun Icon */}
    <LightModeOutlined
      sx={{
        color: darkMode ? "#999" : "#fbbc04",
        fontSize: 20,
      }}
    />
    {/* Moon Icon */}
    <NightlightOutlined
      sx={{
        color: darkMode ? "#14ab78" : "#999",
        fontSize: 20,
      }}
    />
    {/* Slider Circle */}
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: "#fff",
        position: "absolute",
        top: "2px",
        left: darkMode ? "calc(100% - 26px)" : "2px", // ensure it stays inside
        transition: "left 0.3s",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    />
  </Box>
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
          color: muiTheme.palette.text.primary,
          transition: "0.2s",
          "&:hover": { bgcolor: muiTheme.palette.action.hover },
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
