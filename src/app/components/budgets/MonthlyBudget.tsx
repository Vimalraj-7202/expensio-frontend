"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress, Chip, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Grid } from "@mui/material";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { createNewBudget, getAllBudget, updateBudget, deleteBudget } from "@/app/store/budget/budget.thunk";

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const years = Array.from({ length:10 },(_, i) => new Date().getFullYear() + i);

const MonthlyBudget = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.budget);
  const [formData, setFormData] = useState({ month: "", year: "", amount: "" });
  const [editBudgetId, setEditBudgetId] = useState<string | null>(null);
  const currentMonth = months[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  useEffect(() => { dispatch(getAllBudget() as any); }, [dispatch]);

  useEffect(() => {
    if (data?.data?.length) {
      const currentBudget = data.data.find(
        (b: any) => b.month === currentMonth && Number(b.year) === currentYear
      );
      if (currentBudget && !editBudgetId) {
        setFormData({ month: currentBudget.month, year: currentBudget.year, amount: currentBudget.amount });
      } else if (!currentBudget && !editBudgetId) {
        setFormData({ month: currentMonth, year: String(currentYear), amount: "" });
      }
    } else if (!editBudgetId) {
      setFormData({ month: currentMonth, year: String(currentYear), amount: "" });
    }
  }, [data, editBudgetId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (editBudgetId) {
        await dispatch(updateBudget({ id: editBudgetId, data: formData }) as any).unwrap();
        setEditBudgetId(null);
      } else {
        await dispatch(createNewBudget(formData) as any).unwrap();
      }
      setFormData({ month: currentMonth, year: String(currentYear), amount: "" });
      dispatch(getAllBudget() as any);
    } catch (err) { console.error("Failed to save budget:", err); }
  };

  const handleEdit = (budget: any) => {
    setEditBudgetId(budget._id);
    setFormData({ month: budget.month, year: budget.year, amount: budget.amount });
  };

  const handleDelete = async (id: string) => {
    try { await dispatch(deleteBudget(id) as any).unwrap(); dispatch(getAllBudget() as any); } 
    catch (err) { console.error("Failed to delete budget", err); }
  };

  return (
    <Grid container spacing={2} mt={2}>
      {/* Budget Form */}
      <Grid size={{xs:12,md:6}}>
        <Box sx={{ border: "2px solid #e2e8f0", p: 2, borderRadius: 3 }}>
          <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>Monthly Budget</Typography>

          <Grid container spacing={2} alignItems="center" mt={1}>
            <Grid  size={{xs:"auto"}}>
              <CalendarMonthOutlinedIcon sx={{ color: "#14ab78", fontSize: 40 }} />
            </Grid>
            <Grid  size={{xs:6,sm:4}}>
              <Select
                name="month"
                value={formData.month}
                onChange={handleChange}
                displayEmpty
                fullWidth
                sx={{
                  height: "50px",
                  "& .MuiOutlinedInput-notchedOutline": { borderRadius: 2 },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#14ab78", borderWidth: 2 },
                }}
              >
                <MenuItem value="" disabled>Select Month</MenuItem>
                {months.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
              </Select>
            </Grid>
            <Grid size={{xs:6,sm:3}}>
              <Select
                name="year"
                value={formData.year}
                onChange={handleChange}
                displayEmpty
                fullWidth
                sx={{
                  height: "50px",
                  "& .MuiOutlinedInput-notchedOutline": { borderRadius: 2 },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#14ab78", borderWidth: 2 },
                }}
              >
                <MenuItem value="" disabled>Select Year</MenuItem>
                {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
              </Select>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2} alignItems="center">
            <Grid size={{xs:12,sm:7}}>
              <TextField
                fullWidth
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                type="number"
                placeholder="₹ Amount"
                sx={{ height: "50px" }}
              />
            </Grid>
            <Grid  size={{xs:12,sm:5}}>
              <Button
                fullWidth
                sx={{ backgroundColor: "#14ab78", color: "white", height:55,borderRadius:3,textTransform:'none',mt:1,fontSize:20}}
                onClick={handleSave}
                disabled={loading}
              >
                {editBudgetId ? "Update" : "Save"}
              </Button>
              {loading && <CircularProgress size={24} sx={{ position: "absolute", top: "50%", left: "50%", marginTop: "-12px", marginLeft: "-12px" }} />}
            </Grid>
          </Grid>

          {/* Utilization & Chips */}
          <Box mt={2}>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>Utilization</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ flex: 1, height: 16, backgroundColor: "#e0e0e0", borderRadius: 3 }}>
                <Box sx={{ width: "30%", height: "100%", backgroundColor: "#14ab78", borderRadius: 3 }} />
              </Box>
              <Typography sx={{ fontSize: 12, fontWeight: 500, minWidth: 35 }}>30%</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
            <Chip label={`Allocated: ₹${data?.data?.find((b: any) => b.month === formData.month && Number(b.year) === Number(formData.year))?.amount || 0}`} />
            <Chip label="Spent: ₹400" />
            <Chip label="Avg/day: ₹50" />
          </Box>
          {error && <Typography sx={{ color: "red", mt: 1 }}>{error}</Typography>}
        </Box>
      </Grid>

      {/* All Budgets Table */}
      <Grid size={{xs:12,md:6}}>
        <Box sx={{ border: "2px solid #e2e8f0", borderRadius: 3, p: 2, maxHeight:286, overflowY: "auto" }}>
          <Typography sx={{ fontSize: 15, fontWeight: 600, mb: 1 }}>All Budgets</Typography>
          {loading ? <CircularProgress size={24} /> :
            data?.data?.length ? (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "gray" }}>Month</TableCell>
                    <TableCell sx={{ color: "gray" }}>Year</TableCell>
                    <TableCell sx={{ color: "gray" }}>Amount</TableCell>
                    <TableCell sx={{ color: "gray", textAlign: "center" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.data.map((budget: any) => (
                    <TableRow key={budget._id}>
                      <TableCell>{budget.month}</TableCell>
                      <TableCell>{budget.year}</TableCell>
                      <TableCell>₹ {budget.amount}</TableCell>
                      <TableCell sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                        <Button sx={{ color: "gray", border: "1px solid #64748b", textTransform: "none", height: 28 }} onClick={() => handleEdit(budget)}><EditOutlinedIcon fontSize="small" /> Edit</Button>
                        <Button sx={{ color: "red", border: "1px solid #64748b", textTransform: "none", height: 28 }} onClick={() => handleDelete(budget._id)}><DeleteOutlinedIcon fontSize="small" /> Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : <Typography>No budgets found</Typography>}
        </Box>
      </Grid>
    </Grid>
  );
};

export default MonthlyBudget;
