"use client";
import React, { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CommonDialog from "@/app/common/CommonDialog";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
} from "@/app/store/category/category.thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

interface Category {
  id: string;
  category: string;
  limit: number;
  spent: number;
  remaining: number;
  utilization: number;
}

interface FormData {
  category: string;
  limit: string;
}

const BudgetCategory: React.FC = () => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(
    (state: RootState) => state.category
  );

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({ category: "", limit: "" });
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllCategory() as any);
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    if (!formData.category || !formData.limit) return;
    await dispatch(
      createCategory({ category: formData.category, limit: Number(formData.limit) }) as any
    );
    setIsAddDialogOpen(false);
    setFormData({ category: "", limit: "" });
    dispatch(getAllCategory() as any);
  };

  const handleEditOpen = (cat: Category) => {
    setEditCategoryId(cat.id);
    setFormData({ category: cat.category, limit: String(cat.limit) });
    setIsEditDialogOpen(true);
  };

  const handleEdit = async () => {
    if (!editCategoryId || !formData.category || !formData.limit) return;
    await dispatch(
      updateCategory({
        id: editCategoryId,
        data: { category: formData.category, limit: Number(formData.limit) },
      }) as any
    );
    setIsEditDialogOpen(false);
    setFormData({ category: "", limit: "" });
    setEditCategoryId(null);
    dispatch(getAllCategory() as any);
  };

  const handleDeleteOpen = (cat: Category) => {
    setDeleteCategoryId(cat.id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteCategoryId) return;
    await dispatch(deleteCategory(deleteCategoryId) as any);
    setIsDeleteDialogOpen(false);
    setDeleteCategoryId(null);
    dispatch(getAllCategory() as any);
  };

  const categories: Category[] = (data?.categories || []).map(
    (cat: any, index: number) => {
      const spentNum = Number(cat.spent) || 0;
      const remaining = cat.remaining ?? cat.limit - spentNum;
      const utilization = Math.round((spentNum / cat.limit) * 100);
      return {
        id: cat._id || cat.id || `temp-${index}`,
        category: cat.category.charAt(0).toUpperCase() + cat.category.slice(1),
        limit: cat.limit,
        spent: spentNum,
        remaining,
        utilization,
      };
    }
  );

  return (
    <Box
      sx={{
        mt: 3,
        width: "100%",
        border: "2px solid #e2e8f0",
        borderRadius: 3,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: 400,
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
          Category Budgets
        </Typography>
        <span style={{ color: "gray" }}>
          Categorize your budget list as you like.
        </span>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          sx={{
            color: "white",
            backgroundColor: "#14ab78",
            height: 40,
            width: 120,
            textTransform: "none",
            borderRadius: 2,
            fontSize: "18px",
          }}
        >
          + Add
        </Button>
      </Box>

      <CommonDialog
        title="Add Budget"
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAdd}
        actionType="add"
        width={500}
        height={300}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <TextField
            name="limit"
            label="Limit"
            type="number"
            value={formData.limit}
            onChange={handleChange}
          />
        </Box>
      </CommonDialog>

      <CommonDialog
        title="Edit Budget"
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleEdit}
        actionType="edit"
        width={500}
        height={300}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <TextField
            name="limit"
            label="Limit"
            type="number"
            value={formData.limit}
            onChange={handleChange}
          />
        </Box>
      </CommonDialog>

      <CommonDialog
        title="Delete Budget"
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onSubmit={handleDelete}
        actionType="delete"
        width={400}
        height={200}
      >
        <Typography>Are you sure you want to delete?</Typography>
      </CommonDialog>

      {loading && <Typography>Loading categories...</Typography>}
      {error && <Typography color="red">{error}</Typography>}

      {!loading && !error && (
        <Box sx={{ overflowY: "auto", flex: 1 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr 1fr",
              gap: 1,
              fontWeight: 600,
              mb: 1,
              color: "gray",
            }}
          >
            <Typography>Category</Typography>
            <Typography>Limit</Typography>
            <Typography>Spent</Typography>
            <Typography>Remaining</Typography>
            <Typography>Progress</Typography>
            <Typography>Actions</Typography>
          </Box>

          {categories.map((cat) => (
            <Box
              key={cat.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 2fr 1fr",
                gap: 1,
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography>{cat.category}</Typography>
              <Typography>₹{cat.limit.toFixed(2)}</Typography>
              <Typography>₹{cat.spent.toFixed(2)}</Typography>
              <Typography>₹{cat.remaining.toFixed(2)}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    position: "relative",
                    height: 14,
                    width: "100%",
                    borderRadius: 12,
                    backgroundColor: "#e5e7eb",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${cat.utilization}%`,
                      backgroundColor:
                        cat.utilization > 100 ? "red" : "#14ab78",
                      transition: "width 0.4s ease",
                    }}
                  />
                </Box>
                <Typography sx={{ fontSize: 12, minWidth: 30 }}>
                  {cat.utilization}%
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  onClick={() => handleEditOpen(cat)}
                  sx={{
                    color: "gray",
                    border: "1px solid #64748b",
                    textTransform: "none",
                    height: 28,
                    px: 1,
                  }}
                >
                  <EditOutlinedIcon fontSize="small" /> Edit
                </Button>
                <Button
                  onClick={() => handleDeleteOpen(cat)}
                  sx={{
                    color: "red",
                    border: "1px solid #64748b",
                    textTransform: "none",
                    height: 28,
                    px: 1,
                  }}
                >
                  <DeleteOutlinedIcon fontSize="small" /> Delete
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default BudgetCategory;
