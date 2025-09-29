import React from "react";
import { Card, CardContent, Typography, IconButton, Stack } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

interface CardProps {
  item: { name: string };
  onEdit: () => void;
  onDelete: () => void;
}

const CommonCard = ({ item, onEdit, onDelete }: CardProps) => {
  return (
    <Card
      sx={{
        width: 200,
        borderRadius: 2,
        boxShadow: 3,
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardContent sx={{ py: 1.5, px: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body1" fontWeight={600}>
            {item.name}
          </Typography>

          <Stack direction="row" spacing={0.5}>
            <IconButton onClick={onEdit} color="primary" size="small">
              <Edit fontSize="small" />
            </IconButton>
            <IconButton onClick={onDelete} color="error" size="small">
              <Delete fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CommonCard;
