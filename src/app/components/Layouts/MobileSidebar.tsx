"use client";
import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import {
  SpaceDashboardOutlined,
  CreditCard,
  ReceiptLong,
  AdfScannerOutlined,
  AccountBalanceWalletOutlined,
  SettingsOutlined,
  AdminPanelSettings,
  NotificationsActiveOutlined,
} from "@mui/icons-material";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/app/hooks/redux";

const MobileBottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const normalizedRole = user?.role;

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

  const availableItems = menuItems.filter((item) => item.roles.includes(normalizedRole as any));

  // Find active index based on current path
  const activeIndex = availableItems.findIndex((item) => pathname.startsWith(item.path));
  const [value, setValue] = useState(activeIndex >= 0 ? activeIndex : 0);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          router.push(availableItems[newValue].path);
        }}
      >
        {availableItems.map((item, idx) => (
          <BottomNavigationAction key={idx} label={item.label} icon={item.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default MobileBottomNav;
