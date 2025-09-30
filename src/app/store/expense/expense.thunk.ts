import { createAsyncThunk } from "@reduxjs/toolkit";
import {expenseService} from '@/app/lib/expense.management'

//createExpense
export const createNewExpense=createAsyncThunk(
    '/newExpense',
    async(payload:{date:string,merchant:string,description:string,category:string,totalAmount:string},{rejectWithValue})=>{
        try{
            const {data}=await expenseService.createExpense(payload);
            return data;
        }catch(error:any){
            return rejectWithValue(error?.response?.data?.message||'Create Expense failed')
        }
    }
)

//getAllExpense
export const getAllExpense = createAsyncThunk(
  "/getAllExpense",
  async ({ pageNo = 0, pageSize = 10 }: { pageNo?: number; pageSize?: number }, { rejectWithValue }) => {
    try {
      const response = await expenseService.getAllExpense(pageNo, pageSize);
      if (!response) throw new Error("Data not found");
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

//getExpenseByID
export const getExpenseByID = createAsyncThunk(
  "/getExpenseById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await expenseService.getExpenseById(id);
      if (!response) throw new Error("Expense not found");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || error.message || "Fetch Expense failed");
    }
  }
)
