import { createAsyncThunk} from "@reduxjs/toolkit";
import { reportService } from "@/app/lib/report.management";


//getOverView
export const getAllOverview = createAsyncThunk(
  '/getAllOverview',
  async (_, { rejectWithValue }) => {
    try {
      const data = await  reportService.getOverview();
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'GetAll Overiew failed');
    }
  }
);



