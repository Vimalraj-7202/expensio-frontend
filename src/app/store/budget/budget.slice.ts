import { createSlice } from "@reduxjs/toolkit";
import {
  createNewBudget,
  getAllBudget,
  updateBudget,
  deleteBudget,
} from "./budget.thunk";

interface BudgetState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: BudgetState = {
  loading: false,
  error: null,
  data: [],
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //create budget
      .addCase(createNewBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createNewBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //update budget
      .addCase(updateBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //delete budget
      .addCase(deleteBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //getall budget
      .addCase(getAllBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default budgetSlice.reducer;
