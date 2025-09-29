import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createNewExpense,
  getAllExpense,
  getExpenseByID,
} from "./expense.thunk";
import { Expense } from "@/app/types/expense.type";

interface ExpenseState {
  loading: boolean;
  error: string | null;
  data: Expense[];
  selectedExpense?: Expense;
  dropdowns: {
    merchants: string[];
    categories: string[];
  };
}

const initialState: ExpenseState = {
  loading: false,
  error: null,
  data: [],
  selectedExpense: undefined,
  dropdowns: {
    merchants: [],
    categories: [],
  },
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Expense
    builder
      .addCase(createNewExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createNewExpense.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;

          // Append new expense to existing data
          if (action.payload?.data) {
            state.data.push(action.payload.data);
          }

          // Update dropdowns if returned
          if (action.payload?.dropdowns) {
            state.dropdowns.merchants =
              action.payload.dropdowns.merchants ?? state.dropdowns.merchants;
            state.dropdowns.categories =
              action.payload.dropdowns.categories ?? state.dropdowns.categories;
          }
        }
      )
      .addCase(createNewExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // getAllExpense
    builder
      .addCase(getAllExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllExpense.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload.data ?? [];
        state.dropdowns = action.payload.dropdowns ?? state.dropdowns;
      })
      .addCase(getAllExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //getExpenseByID
    builder
      .addCase(getExpenseByID.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedExpense = undefined;
      })
      .addCase(
        getExpenseByID.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.selectedExpense = action.payload;
        }
      )
      .addCase(getExpenseByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.selectedExpense = undefined;
      });
  },
});

export default expenseSlice.reducer;
