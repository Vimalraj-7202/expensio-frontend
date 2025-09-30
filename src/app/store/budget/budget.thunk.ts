import { createAsyncThunk} from "@reduxjs/toolkit";
import { budgetService } from "@/app/lib/budget.management";

//create budget
export const createNewBudget = createAsyncThunk(
  "/newBudget",
  async (
    payload: { month: string; year: string; amount: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await budgetService.createBudget(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Create Budget failed"
      );
    }
  }
);

//update budget
export const updateBudget = createAsyncThunk(
  "/updateBudget",
  async (
    { id, data }:{id:string,data:any},{ rejectedWithValue }: any) => {
    try {
      const response = await budgetService.updateBudget(id, data);
      return response.data;
    } catch (error: any) {
      return rejectedWithValue(error.response?.data || error.message);
    }
  }
);

//delete budget
export const deleteBudget = createAsyncThunk(
  "/deleteBudget",
  async (id: string, { rejectedWithValue }: any) => {
    try {
      await budgetService.deleteBudget(id);
      return id;
    } catch (error: any) {
      return rejectedWithValue(error.response?.data || error.message);
    }
  }
);

//getall budget
export const getAllBudget = createAsyncThunk(
  "/getallBudget",
  async (_, { rejectedWithValue }: any) => {
    try {
      const response = await budgetService.getallBudget();
      return response;
    } catch (error: any) {
      return rejectedWithValue(
        error?.response?.data?.message || "GetAll Budget failed"
      );
    }
  }
);
