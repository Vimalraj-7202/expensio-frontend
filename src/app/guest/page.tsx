"use client";
import React from "react";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import AutoAwesome from "@mui/icons-material/AutoAwesomeOutlined";
import Secure from "@mui/icons-material/GppGoodOutlined";
import Time from "@mui/icons-material/ScheduleOutlined";
import Budget from "@mui/icons-material/CardTravelOutlined";
import Task from "@mui/icons-material/TaskAltOutlined";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,Area} from "recharts";

const data = [
  { date: "Sep 10", spend: 45 },
  { date: "Sep 11", spend: 60 },
  { date: "Sep 12", spend: 70 },
  { date: "Sep 13", spend: 80 },
  { date: "Sep 14", spend: 75 },
  { date: "Sep 15", spend: 78 },
  { date: "Sep 16", spend: 65 },
  { date: "Sep 17", spend: 55 },
  { date: "Sep 18", spend: 40 },
  { date: "Sep 19", spend: 38 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "white",
          p: 1.5,
          borderRadius: 3,
          boxShadow: 4,
          minWidth: 120,
        }}
      >
        <Typography variant="body2" fontWeight={700} color="#111">
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: "#14ab78" }}>
          Spend: ${payload[0].value}
        </Typography>
      </Box>
    );
  }
  return null;
};

const Page = () => {
  const router = useRouter();
  const handleSignUp = () => router.push("/auth/login");

  return (
    <Box
      sx={{
        p: { xs: 3, md:1},
        overflowX: "hidden",
        minHeight: "100vh",
        bgcolor: "#fafafa",
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Box sx={{ width: 55, height: 55, position: "relative" }}>
          <Image
            src="/wallet.svg"
            alt="Expensio Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#111" }}
        >
          Expensio
        </Typography>
      </Box>

      {/* Guest Mode */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        <Chip
          label="✨ Guest mode.Explore without an account"
          sx={{
            letterSpacing: 0.5,
            fontWeight: 600,
            bgcolor: "#e0f4f1",
            color: "#0e8f65",
          }}
        />
        <Button
          onClick={handleSignUp}
          sx={{
            fontSize: 16,
            height: 45,
            px: 3,
            bgcolor: "#14ab78",
            color: "white",
            textTransform: "none",
            borderRadius: 3,
            fontWeight: 600,
            "&:hover": { bgcolor: "#0e8f65" },
          }}
        >
          Sign Up / Login
        </Button>
      </Box>

      {/* Title */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: { xs: "28px", md: "36px" },
            fontWeight: 800,
            mb: 1,
            color: "#111",
          }}
        >
        See Expensio in action
        </Typography>
        <Typography sx={{ color: "#666", fontSize: 18 }}>
          A guided preview of the app’s UI – no data saved.
        </Typography>
      </Box>

      {/* Live Preview */}
      <Box sx={{ mb: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          {/* Add Expense */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              borderRadius: 4,
              bgcolor: "white",
              boxShadow: 3,
            }}
          >
            <Typography fontWeight={700} mb={1.5} color="#111">
              Add Expense (demo)
            </Typography>
            <Typography sx={{ color: "#666", mb: 1 }}>Description</Typography>
            <TextField placeholder="e.g. Lunch" fullWidth sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField placeholder="20.5" fullWidth />
              <TextField placeholder="Food" fullWidth />
            </Box>
            <Button
              sx={{
                width: "100%",
                height: 45,
                bgcolor: "#14ab78",
                color: "white",
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { bgcolor: "#0e8f65" },
              }}
            >
              Save (demo)
            </Button>
          </Box>

          {/* Budgets */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              borderRadius: 4,
              bgcolor: "white",
              boxShadow: 3,
            }}
          >
            <Typography fontWeight={700} mb={2} color="#111">
              Budgets
            </Typography>
            {[
              { label: "Food", value: 50 },
              { label: "Transport", value: 30 },
              { label: "Utilities", value: 70 },
            ].map((item, idx) => (
              <Box key={idx} sx={{ mb: idx === 2 ? 0 : 3 }}>
                <Typography sx={{ fontSize: 14, mb: 0.5, color: "#666" }}>
                  {item.label}
                </Typography>
                <Box
                  sx={{
                    height: 25,
                    width: "100%",
                    borderRadius: 4,
                    bgcolor: "#f0f0f0",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${item.value}%`,
                      bgcolor: "#14ab78",
                      borderRadius: 4,
                      transition: "width 0.5s ease",
                    }}
                  />
                  <Typography
                    sx={{
                      position: "absolute",
                      right: 10,
                      color: "#111",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {item.value}%
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Spending Chart */}
      <Box
        sx={{
          p: 3,
          borderRadius: 4,
          bgcolor: "white",
          boxShadow: 3,
          mb: 5,
        }}
      >
        <Typography fontWeight={700} mb={2} color="#111">
          Spending Last 10 Days
        </Typography>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14ab78" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#14ab78" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={{ stroke: "#e0e0e0" }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="spend"
              stroke="none"
              fill="url(#colorSpend)"
            />
            <Line
              type="monotone"
              dataKey="spend"
              stroke="#14ab78"
              strokeWidth={3}
              dot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Feature Highlights */}
      <Box
        sx={{
          p: 3,
          borderRadius: 4,
          bgcolor: "white",
          boxShadow: 3,
          mb: 5,
        }}
      >
        <Typography fontWeight={700} mb={2} color="#111">
          Feature Highlights
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {[
            {
              icon: <AutoAwesome />,
              title: "Fast Entry",
              desc: "Add expenses in seconds with smart defaults.",
            },
            {
              icon: <Secure />,
              title: "Secure Roles",
              desc: "Admin and user flows with permissions built in.",
            },
            {
              icon: <Time />,
              title: "Real-time",
              desc: "Instant charts and budgets as you type.",
            },
            {
              icon: <Budget />,
              title: "Budgets",
              desc: "Set monthly caps and track progress.",
            },
          ].map((f, i) => (
            <Box
              key={i}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "#f9fafb",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                transition: "0.3s",
                borderLeft: `5px solid #14ab78`,
                "&:hover": { boxShadow: 4, bgcolor: "white" },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: 700,
                  color: "#111",
                }}
              >
                {f.icon}
                {f.title}
              </Typography>
              <Typography sx={{ color: "#666", fontSize: 14 }}>
                {f.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* What You'll Get */}
      <Box
        sx={{
          p: 3,
          borderRadius: 4,
          bgcolor: "white",
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography fontWeight={700} variant="h6" mb={1} color="#111">
          What You will Get
        </Typography>
        <Chip
          label="🎉 No credit card needed"
          sx={{
            mb: 3,
            bgcolor: "#e0f4f1",
            fontWeight: 600,
            color: "#0e8f65",
          }}
        />
        <Box
          component="ul"
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 2,
            justifyContent: "center",
          }}
        >
          {[
            "Unlimited Categories",
            "Receipt Uploads",
            "Exportable Reports",
            "Budget Tracking",
            "Team Roles (admin/user)",
            "Dark Mode",
          ].map((item, i) => (
            <Box
              component="li"
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                p: 1.5,
                borderRadius: 3,
                bgcolor: "#f0f0f0",
                fontWeight: 600,
                transition: "0.3s",
                "&:hover": { bgcolor: "#e0f4f1" },
              }}
            >
              <Task sx={{ color: "#14ab78" }} />
              {item}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Page;
