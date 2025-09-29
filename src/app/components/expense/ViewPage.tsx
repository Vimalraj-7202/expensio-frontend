"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, CircularProgress, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { getExpenseByID } from "@/app/store/expense/expense.thunk";
import { RootState } from "@/app/store/store";
import { motion } from "framer-motion";

interface ViewPageProps {
  expenseId: string;
  onClose: () => void;
}

const ViewPage = ({ expenseId, onClose }: ViewPageProps) => {
  const dispatch = useDispatch();
  const { selectedExpense, loading, error } = useSelector((state: RootState) => state.expense);

  useEffect(() => {
    if (expenseId) {
      dispatch(getExpenseByID(expenseId) as any);
    }
  }, [dispatch, expenseId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" mt={4} textAlign="center">
        {error}
      </Typography>
    );
  }

  if (!selectedExpense) {
    return (
      <Typography mt={4} color="gray" textAlign="center">
        No expense found.
      </Typography>
    );
  }

  const { date, merchant, description, category, totalAmount } = selectedExpense;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 700,
          bgcolor: "#fefefe",
          borderRadius: 3,
          p: 5,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 20, right: 20 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h4" fontWeight={600} textAlign="center">
          Expense Details
        </Typography>

        {/* Expense info */}
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
            <Typography color="text.secondary">Date</Typography>
            <Typography>{date ? dayjs(date as any).format("DD MMM YYYY") : "-"}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
            <Typography color="text.secondary">Merchant</Typography>
            <Typography>{merchant || "-"}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
            <Typography color="text.secondary">Description</Typography>
            <Typography>{description || "-"}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
            <Typography color="text.secondary">Category</Typography>
            <Typography>{category || "-"}</Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
            <Typography color="text.secondary">Amount</Typography>
            <Typography sx={{ color: "#14ab78", fontWeight: 600 }}>
              ₹ {totalAmount || 0}
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ViewPage;
