"use client";
import { Box, Grid, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AllOutOutlinedIcon from '@mui/icons-material/AllOutOutlined';
import ElectricBikeOutlinedIcon from '@mui/icons-material/ElectricBikeOutlined';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { JSX, useEffect } from "react";
import { getAllOverview } from "@/app/store/reports/report.thunk";

const OverView = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.report);

  useEffect(() => {
    dispatch(getAllOverview() as any);
  }, [dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return null;

  // Map category names to icons
  const categoryIcons: { [key: string]: JSX.Element } = {
    transport: <ElectricBikeOutlinedIcon sx={{ fontSize: 28, color: "#14ab78" }} />,
    entertainment: <MovieFilterOutlinedIcon sx={{ fontSize: 28, color: "#14ab78" }} />,
    food: <RestaurantMenuOutlinedIcon sx={{ fontSize: 28, color: "#14ab78" }} />,
    others: <AllOutOutlinedIcon sx={{ fontSize: 28, color: "#14ab78" }} />,
  };

  const getCategoryIcon = (category: string | undefined) => {
    if (!category) return <ShoppingCartIcon sx={{ fontSize: 28, color: "#14ab78" }} />;
    const key = category.toLowerCase();
    return categoryIcons[key] || <ShoppingCartIcon sx={{ fontSize: 28, color: "#14ab78" }} />;
  };

  const overviewData = [
    {
      label: "Total (30d)",
      value: data.data?.totalSpent,
      icon: <CurrencyRupeeIcon sx={{ fontSize: 28, color: "#14ab78" }} />,
    },
    {
      label: "Average / day",
      value: data.data?.averagePerDay,
      icon: <TrendingUpIcon sx={{ fontSize: 28, color: "#14ab78" }} />,
    },
    {
      label: "Top Category",
      value: data.data?.topCategory,
      icon: getCategoryIcon(data.data?.topCategory),
    },
    {
      label: "Categories",
      value: data.data?.categories,
      icon: <CategoryIcon sx={{ fontSize: 28, color: "#14ab78" }} />,
    },
  ];

  return (
    <Grid container spacing={2}>
      {overviewData.map((item, index) => (
        <Grid size={{md:3,xs:12,sm:6,lg:3}}>
        <Box
          key={index}
          sx={{
            height: 100,
            mt:0,
            cursor: "pointer",
            width:'100%',
            border: "2px solid #e2e8f0",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
            backgroundColor: "#f9fafb",
            transition: "0.3s",
            "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography sx={{ color: "#64748b", fontSize: 19 }}>{item.label}</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 22, letterSpacing: 0.5 }}>
              {item.value}
            </Typography>
          </Box>
          <Box>{item.icon}</Box>
        </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default OverView;
