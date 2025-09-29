"use client";
import { RootState } from "@/app/store/store";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { getAllOverview } from "@/app/store/reports/report.thunk";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.report
  );
  const { name, role } = useSelector(
    (state: RootState) =>
      (state.auth.user as { name: string; role: string }) || {}
  );
  useEffect(() => {
    dispatch(getAllOverview() as any);
  }, [dispatch]);

  const cardStyle = {
    borderRadius: "15px",
    height: "120px",
    p: 2,
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.3s ease",
    "&:hover": { transform: "scale(1.05)", cursor: "pointer" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  // Card Data
  const cards = [
    {
      label: "Total in September",
      value: loading || error ? 0 : data.data?.totalSpent || 0,
      gradient: "linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)",
      borderColor: "#3b8ca5",
      icon: <AttachMoneyOutlinedIcon sx={{ color: "#3b8ca5", fontSize: 22 }} />,
      dotColor: "#3b8ca5",
    },
    {
      label: "Average / Day",
      value: loading || error ? 0 : data.data?.averagePerDay || 0,
      gradient: "linear-gradient(135deg, #ede7f6 0%, #b39ddb 100%)",
      borderColor: "#5e35b1",
      icon: (
        <CalendarTodayOutlinedIcon sx={{ color: "#5e35b1", fontSize: 22 }} />
      ),
      dotColor: "#5e35b1",
    },
    {
      label: "Largest Category",
      value: loading || error ? "N/A" : data.data?.topCategory || "N/A",
      gradient: "linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%)",
      borderColor: "#ef6c00",
      icon: <CategoryOutlinedIcon sx={{ color: "#ef6c00", fontSize: 22 }} />,
      dotColor: "#ef6c00",
    },
    {
      label: "Receipts",
      value: loading || error ? 0 : 0,
      gradient: "linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 100%)",
      borderColor: "#2e7d32",
      icon: <ReceiptLongOutlinedIcon sx={{ color: "#2e7d32", fontSize: 22 }} />,
      dotColor: "#2e7d32",
    },
  ];

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold" }}>
        Welcome Back, 🙌 {name}
      </Typography>
      <Typography sx={{ color: "gray" }}>
        Overview of your spending and recent activity.
      </Typography>

      {/* overall detail using GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          },
          gap: 2,
          mt: 2,
        }}
      >
        {cards.map((card, i) => (
          <Box
            key={i}
            sx={{ ...cardStyle, background: card.gradient, color: "#000" }}
          >
            {/* Icon in square */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                border: `1.5px solid ${card.borderColor}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 1,
              }}
            >
              {card.icon}
            </Box>

            {/* Label + Value */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: card.borderColor, fontWeight: 500, fontSize: 14 }}
              >
                {card.label}
              </Typography>
              <span
                style={{ fontWeight: "bold", fontSize: "28px", color: "black" }}
              >
                {card.value}
              </span>
            </Box>

            {/* Dotted background pattern */}
            <Box
              component="svg"
              viewBox="0 0 100 140"
              xmlns="http://www.w3.org/2000/svg"
              sx={{
                position: "absolute",
                right: -20,
                top: -20,
                height: "160%",
                width: 200,
                opacity: 0.1,
                pointerEvents: "none",
              }}
            >
              <defs>
                <pattern
                  id={`dots-${i}`}
                  x="0"
                  y="0"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.5" fill={card.dotColor} />
                </pattern>
              </defs>
              <rect width="100" height="140" fill={`url(#dots-${i})`} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Page;
