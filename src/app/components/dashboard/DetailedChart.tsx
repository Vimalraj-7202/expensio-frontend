"use client";
import { Box, Paper, Typography, Grid } from "@mui/material";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";

// Sample spending data for line/area chart
const lineData = [
  { date: "Sep 7", amount: 0 },
  { date: "Sep 8", amount: 0 },
  { date: "Sep 9", amount: 0 },
  { date: "Sep 10", amount: 0 },
  { date: "Sep 11", amount: 0 },
  { date: "Sep 12", amount: 0 },
  { date: "Sep 13", amount: 0 },
  { date: "Sep 14", amount: 0 },
  { date: "Sep 15", amount: 50 },
  { date: "Sep 16", amount: 20 },
  { date: "Sep 17", amount: 0 },
  { date: "Sep 18", amount: 150 },
  { date: "Sep 19", amount: 300 },
];

// Category breakdown for donut chart
const categoryData = [
  { name: "Food", value: 4000 },
  { name: "Travel", value: 2800 },
  { name: "Utilities", value: 1250 },
  { name: "Shopping", value: 1200 },
];

const COLORS = ["#9026ed", "#41f594", "#f59e0b", "teal"];
const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: "#111827",
          color: "#fff",
          p: 1,
          borderRadius: "8px",
        }}
      >
        {payload.map((entry: any, index: number) => (
          <Box
            key={`tooltip-${index}`}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: entry.color,
              }}
            />
            <Typography fontSize={14}>
              {entry.name}: ₹ {entry.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

const DetailedChart = () => {
  return (
    <Grid container spacing={2} mt={0.5}>
      {/* Area Chart */}
      <Grid size={{ xs:12 ,md:12,lg:6}}>
        <Paper sx={{ height: 280, borderRadius: "12px", p: 2 }}>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>
            Spending last 14 days
          </Typography>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#111827",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#16a34a"
                fill="url(#colorSpend)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Donut Chart */}
      <Grid size={{xs:12,md:12,lg:6}}>
        <Paper
          sx={{
            height: 280,
            borderRadius: "12px",
            p: 2,
            display: "flex",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ mb: 1, fontWeight: 500 }}>
              Spending by Category
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  cornerRadius={6}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                  {/* Center Label */}
                  <Label
                    position="center"
                    content={() => (
                      <g>
                        <text
                          x="50%"
                          y="49%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          style={{
                            fontSize: "25px",
                            fontWeight: 500,
                            fill: "#6b7280",
                          }}
                        >
                          Total
                        </text>
                        <text
                          x="50%"
                          y="63%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            fill: "#14ab78",
                          }}
                        >
                          ₹ {totalValue}
                        </text>
                      </g>
                    )}
                  />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* Custom Legend */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 1.5,
              pl: 2,
            }}
          >
            {categoryData.map((entry, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: COLORS[index % COLORS.length],
                    mr: 1,
                  }}
                />
                <Typography fontSize={14}>
                  {entry.name} — ₹ {entry.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DetailedChart;
