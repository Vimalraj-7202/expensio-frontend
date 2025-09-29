"use client";
import { JSX, useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete,
  Paper,
  CircularProgress,
  Grid,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import CommonDialog from "@/app/common/CommonDialog";
import CommonSearch from "@/app/common/CommonSearch";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import LocalTaxiOutlinedIcon from "@mui/icons-material/LocalTaxiOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewExpense,
  getAllExpense,
} from "@/app/store/expense/expense.thunk";
import { RootState } from "@/app/store/store";
import ViewPage from "./ViewPage";
import CommonTitle from "@/app/common/CommonTitle";

interface Expense {
  date: string;
  totalAmount: string;
  merchant: string;
  category: string;
  description: string;
}

const merchant = ["Uber", "Ola", "Amazon", "Flipkart", "Zomato", "Swiggy"];
const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Others",
];

const categoryIcons: Record<string, JSX.Element> = {
  Food: <FastfoodOutlinedIcon sx={{ color: "grey", fontSize: 40 }} />,
  Transport: <LocalTaxiOutlinedIcon sx={{ color: "grey", fontSize: 40 }} />,
  Shopping: <ShoppingBagOutlinedIcon sx={{ color: "grey", fontSize: 40 }} />,
  Entertainment: <MovieOutlinedIcon sx={{ color: "grey", fontSize: 40 }} />,
  Bills: <ReceiptLongOutlinedIcon sx={{ color: "grey", fontSize: 40 }} />,
  Other: <CategoryOutlinedIcon sx={{ color: "grey", fontSize: 40 }} />,
};

const fieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    transition: "all 0.3s ease",
    "& fieldset": { borderColor: "#ccc" },
    "&:hover fieldset": { borderColor: "#999" },
    "&.Mui-focused fieldset": {
      borderColor: "#14ab78",
      boxShadow: "0 0 0 2px rgba(20,171,120,0.15)",
    },
  },
};

const Page = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.expense
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<
    string | null | undefined
  >(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState<Expense>({
    date: dayjs().format("YYYY-MM-DD"),
    totalAmount: "",
    merchant: "",
    category: "",
    description: "",
  });

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const filteredData = data?.filter((expense) => {
  const text = searchText.toLowerCase();
  return (
    String(expense.merchant || "").toLowerCase().includes(text) ||
    String(expense.description || "").toLowerCase().includes(text) ||
    String(expense.category || "").toLowerCase().includes(text)
  );
});

  const handleSubmit = () => {
    dispatch(createNewExpense(formData) as any)
      .unwrap()
      .then(() => {
        setFormData({
          date: dayjs().format("YYYY-MM-DD"),
          totalAmount: "",
          merchant: "",
          category: "",
          description: "",
        });
        handleCloseDialog();
        dispatch(getAllExpense({ pageNo: 0, pageSize: 10 }) as any);
      })
      .catch((err: any) => {
        console.error("Failed to save expense", err);
      });
  };

  useEffect(() => {
    dispatch(getAllExpense({ pageNo: 0, pageSize: 10 }) as any);
  }, [dispatch]);

  if (selectedExpenseId) {
    return (
      <ViewPage
        expenseId={selectedExpenseId}
        onClose={() => setSelectedExpenseId(null)}
      />
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: { xs: 1, sm: 2, md: 0 } }}>
        {/* Header */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid size={{ xs: 12, sm: 6 }}>
            <CommonTitle title="Expenses" subTitle=" Add, view, and manage your expenses."/>
          </Grid>
          <Grid size={{ xs: 12, sm: "auto" }} sx={{ mt: { xs: 2, sm: 0 } }}>
            <Button
              sx={{
                backgroundColor: "#14ab78",
                color: "white",
                height: "40px",
                width: { xs: "100%", sm: "150px" },
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { backgroundColor: "#0f8e62" },
                boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
              }}
              onClick={handleOpenDialog}
            >
              Add Expense
            </Button>
          </Grid>
        </Grid>

        <CommonDialog
          open={isDialogOpen}
          onClose={handleCloseDialog}
          title="Add New Expense"
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            {/* Date Picker */}
            <DatePicker
              label="Date"
              value={dayjs(formData.date)}
              onChange={(newValue: Dayjs | null) => {
                setFormData((prev) => ({
                  ...prev,
                  date: newValue ? newValue.format("YYYY-MM-DD") : "",
                }));
              }}
              slotProps={{ textField: { fullWidth: true, sx: fieldStyles } }}
            />

            {/* Total Amount */}
            <TextField
              label="Total Amount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              fullWidth
              sx={fieldStyles}
            />

            {/* Merchant Autocomplete */}
            <Autocomplete
              options={merchant}
              value={formData.merchant}
              onChange={(_, value) =>
                setFormData((prev) => ({ ...prev, merchant: value || "" }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Merchant"
                  sx={fieldStyles}
                  fullWidth
                />
              )}
            />

            {/* Category Autocomplete */}
            <Autocomplete
              options={categories}
              value={formData.category}
              onChange={(_, value) =>
                setFormData((prev) => ({ ...prev, category: value || "" }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  sx={fieldStyles}
                  fullWidth
                />
              )}
            />

            {/* Description */}
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              sx={fieldStyles}
            />

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 1,
                gap: 1,
              }}
            >
              <Button variant="outlined" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#14ab78",
                  "&:hover": { backgroundColor: "#0f8e62" },
                }}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Box>
          </Box>
        </CommonDialog>

        {/* View toggle */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 3, gap: 1 }}>
          <Typography sx={{ color: "gray", mr: 1 }}>View:</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#ded9d9ff",
              borderRadius: "50px",
              p: "4px 5px",
            }}
          >
            <Box
              onClick={() => setViewMode("list")}
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backgroundColor: viewMode === "list" ? "#14ab78" : "#e0e0e0",
              }}
            >
              <ViewListRoundedIcon
                sx={{
                  color: viewMode === "list" ? "white" : "grey",
                  fontSize: 15,
                }}
              />
            </Box>
            <Box
              onClick={() => setViewMode("grid")}
              sx={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backgroundColor: viewMode === "grid" ? "#14ab78" : "#e0e0e0",
              }}
            >
              <GridViewRoundedIcon
                sx={{
                  color: viewMode === "grid" ? "white" : "grey",
                  fontSize: 18,
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box mt={3} mb={2}>
          <CommonSearch
            query={searchText}
            onChange={setSearchText}
            placeholder="Search expenses..."
          />
        </Box>

        {/* Expenses Display */}
        <Box mt={4}>
          {loading && (
            <Box mt={4} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}

          {!loading && !error && data?.length === 0 && (
            <Typography mt={4} color="gray">
              No expenses found.
            </Typography>
          )}

          {!loading && data?.length > 0 && (
            <>
              {viewMode === "list" ? (
                <Grid container spacing={2}>
                  {filteredData.map((expense, index) => (
                    <Grid size={{ xs: 12 }} key={index}>
                      <Paper
                        elevation={3}
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: { xs: "flex-start", sm: "center" },
                          justifyContent: "space-between",
                          borderRadius: 3,
                          "&:hover": {
                            boxShadow: "0 12px 24px rgba(15, 198, 52, 0.15)",
                            cursor: "pointer",
                          },
                        }}
                        onClick={() =>
                          setSelectedExpenseId((expense._id as string) || null)
                        }
                      >
                        {/* Left: Icon */}
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            backgroundColor: "#f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: { xs: 2, sm: 0 },
                            mr: { sm: 2 },
                          }}
                        >
                          {categoryIcons[expense.category] || (
                            <CategoryOutlinedIcon
                              sx={{ fontSize: 30, color: "#888" }}
                            />
                          )}
                        </Box>

                        {/* Middle Info */}
                        <Grid container spacing={1} flex={1}>
                          <Grid size={{ xs: 6, md: 3 }}>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Date
                            </Typography>
                            <Typography>
                              {expense.date
                                ? dayjs(expense.date as string).format(
                                    "DD MMM YYYY"
                                  )
                                : "-"}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 6, md: 3 }}>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Merchant
                            </Typography>
                            <Typography>{expense.merchant || "-"}</Typography>
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Description
                            </Typography>
                            <Typography noWrap>
                              {expense.description || "-"}
                            </Typography>
                          </Grid>
                          <Grid size={{ xs: 6, md: 2 }}>
                            <Typography
                              variant="subtitle2"
                              color="text.secondary"
                            >
                              Category
                            </Typography>
                            <Typography>{expense.category}</Typography>
                          </Grid>
                        </Grid>

                        {/* Right: Amount */}
                        <Box
                          sx={{
                            ml: { sm: 3 },
                            mt: { xs: 2, sm: 0 },
                            textAlign: "right",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Amount
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ color: "#14ab78", fontWeight: 600 }}
                          >
                            ₹ {expense.totalAmount || "0"}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  {data.map((expense, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                      <Paper
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          border: "1px solid #e0e0e0",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                          display: "flex",
                          gap: 2,
                          flexDirection: "row",
                          "&:hover": {
                            boxShadow: "0 8px 20px rgba(9, 220, 97, 0.12)",
                            cursor: "pointer",
                          },
                          minHeight: "120px",
                        }}
                        onClick={() =>
                          setSelectedExpenseId((expense._id as string) || null)
                        }
                      >
                        <Box>
                          {categoryIcons[expense.category] || (
                            <CategoryOutlinedIcon
                              sx={{ color: "grey", fontSize: 40 }}
                            />
                          )}
                        </Box>
                        <Box
                          flex={1}
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                        >
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            mb={1}
                          >
                            <Typography sx={{ fontWeight: 600 }}>
                              {expense.merchant || "Unknown"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {expense.category}
                            </Typography>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                flex: 1,
                                fontSize: 13,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {expense.description || "-"}
                            </Typography>
                            <Typography
                              sx={{ fontWeight: 600, color: "#14ab78", ml: 1 }}
                            >
                              ₹ {expense.totalAmount || "0"}
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="flex-end">
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {expense.date
                                ? dayjs(expense.date as string).format(
                                    "YYYY-MM-DD"
                                  )
                                : "-"}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Page;
