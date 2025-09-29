import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryService } from "@/app/lib/category.management";

// create category
export const createCategory = createAsyncThunk(
  '/createCategory',
  async (payload: { category: string; limit: number }, { rejectWithValue }) => {
    try {
      const data = await categoryService.createCategory(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Create category failed');
    }
  }
);

// update category
export const updateCategory = createAsyncThunk(
  '/updateCategory',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await categoryService.updateCategory(id, data);
      return response; // already returns data
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// delete category
export const deleteCategory = createAsyncThunk(
  '/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      await categoryService.deleteCategory(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// get all categories
export const getAllCategory = createAsyncThunk(
  '/getAllCategory',
  async (_, { rejectWithValue }) => {
    try {
      const data = await categoryService.getAllCategory();
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'GetAll Category failed');
    }
  }
);
