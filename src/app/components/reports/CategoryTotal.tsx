'use client'
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store/store";
import { getCategoryTotal } from "@/app/store/categoryTotal/total.thunk";

import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const CategoryChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.total);

  useEffect(() => {
    dispatch(getCategoryTotal());
  }, [dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{`Error: ${error}`}</Typography>;

  const chartData = data
    ? Object.entries(data).map(([category, total]) => ({
        category,
        total,
      }))
    : [];

  const barColor = "#14ab78";

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { category, total } = payload[0].payload;
      return (
        <Box sx={{ p: 1, bgcolor: "#fff", border: "1px solid #ccc", borderRadius: 1, boxShadow: 1 }}>
          <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
            {`${category} - ${total}`}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: "100%", height: 300, mt:1, p: 2, borderRadius: 3, background: "#f9f9f9", overflow: "hidden" }}>
      <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}>
        Category Totals
      </Typography>

      {chartData.length === 0 ? (
        <Typography>No data available</Typography>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
          >
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar 
              dataKey="total" 
              fill={barColor} 
              radius={[10, 10, 0, 0]} 
              barSize={70}
            >
              <LabelList
                dataKey="category"
                position="top"
                style={{ fontSize: 12, fontWeight: 500 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default CategoryChart;
