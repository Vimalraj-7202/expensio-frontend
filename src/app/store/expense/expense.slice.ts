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
  pageNo: number;       // current page
  hasMore: boolean;     // for infinite scroll
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
  pageNo: 0,
  hasMore: true,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    resetExpenses(state) {
      state.data = [];
      state.pageNo = 0;
      state.hasMore = true;
    },
  },
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
          if (action.payload?.data) {
            state.data.unshift(action.payload.data); // new expense at top
          }
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

    // Get All Expenses (Infinite Scroll)
    builder
      .addCase(getAllExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllExpense.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;

        const expenses = action.payload.data ?? [];
        const pageNo = action.payload.pageNo ?? state.pageNo;

        if (pageNo === 0) {
          state.data = expenses; // first page replaces data
        } else {
          state.data = [...state.data, ...expenses]; // append for next pages
        }

        state.pageNo = pageNo;
        state.hasMore = pageNo + 1 < action.payload.totalPages;
        state.dropdowns = action.payload.dropdowns ?? state.dropdowns;
      })
      .addCase(getAllExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Expense By ID
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

export const { resetExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
