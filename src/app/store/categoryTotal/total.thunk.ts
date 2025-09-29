import { createAsyncThunk } from "@reduxjs/toolkit";
import { reportService } from "@/app/lib/report.management";

export const getCategoryTotal = createAsyncThunk(
  '/getCategoryTotal',
  async (_, { rejectWithValue }) => {
    try {
      const response = await reportService.getCategoryTotal();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'GetCategoryTotal failed');
    }
  }
);
