"use client";
import { Box, Grid, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AllOutOutlinedIcon from "@mui/icons-material/AllOutOutlined";
import ElectricBikeOutlinedIcon from "@mui/icons-material/ElectricBikeOutlined";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { JSX, useEffect } from "react";
import { getAllOverview } from "@/app/store/reports/report.thunk";
import { useTheme } from "@mui/material/styles";

const OverView = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.report
  );

  useEffect(() => {
    dispatch(getAllOverview() as any);
  }, [dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return null;

  // Map category names to icons
  const categoryIcons: { [key: string]: JSX.Element } = {
    transport: (
      <ElectricBikeOutlinedIcon
        sx={{ fontSize: 28, color: theme.palette.primary.main }}
      />
    ),
    entertainment: (
      <MovieFilterOutlinedIcon
        sx={{ fontSize: 28, color: theme.palette.primary.main }}
      />
    ),
    food: (
      <RestaurantMenuOutlinedIcon
        sx={{ fontSize: 28, color: theme.palette.primary.main }}
      />
    ),
    others: (
      <AllOutOutlinedIcon
        sx={{ fontSize: 28, color: theme.palette.primary.main }}
      />
    ),
  };

  const getCategoryIcon = (category: string | undefined) => {
    if (!category)
      return (
        <ShoppingCartIcon
          sx={{ fontSize: 28, color: theme.palette.primary.main }}
        />
      );
    const key = category.toLowerCase();
    return (
      categoryIcons[key] || (
        <ShoppingCartIcon
          sx={{ fontSize: 28, color: theme.palette.primary.main }}
        />
      )
    );
  };

  const overviewData = [
    {
      label: "Total (30d)",
      value: data.data?.totalSpent,
      icon: (
        <CurrencyRupeeIcon
          sx={{ fontSize: 28, color: theme.palette.primary.main }}
        />
      ),
    },
    {
      label: "Average / day",
      value: data.data?.averagePerDay,
      icon: (
        <TrendingUpIcon
          sx={{ fontSize: 28, color: theme.palette.primary.main }}
        />
      ),
    },
    {
      label: "Top Category",
      value: data.data?.topCategory,
      icon: getCategoryIcon(data.data?.topCategory),
    },
    {
      label: "Categories",
      value: data.data?.categories,
      icon: (
        <CategoryIcon
          sx={{ fontSize: 28, color: theme.palette.primary.main }}
        />
      ),
    },
  ];

  return (
    <Grid container spacing={2}>
      {overviewData.map((item, index) => (
        <Grid key={index} size={{ md: 3, xs: 12, sm: 6, lg: 3 }}>
          <Box
            key={index}
            sx={{
              height: 100,
              mt: 0,
              cursor: "pointer",
              width: "100%",
              border: `2px solid ${theme.palette.divider}`,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
              backgroundColor: theme.palette.background.paper,
              transition: "0.3s",
              "&:hover": {
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 4px 12px rgba(255,255,255,0.15)"
                    : "0 4px 12px rgba(0,0,0,0.15)",
              },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography
                sx={{ color: theme.palette.text.secondary, fontSize: 19 }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: 0.5,
                  color: theme.palette.text.primary,
                }}
              >
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
