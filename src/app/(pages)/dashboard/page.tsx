'use client'
import { RootState } from '@/app/store/store';
import { Box, Typography } from '@mui/material'
import React from 'react';
import { useSelector } from 'react-redux';
import ProtectedRoute from '@/app/routes/ProtectedRoute';

const page = () => {
const { name, role } = useSelector((state: RootState) => state.auth.user as { name: string; role: string }||{});

  return (
    <ProtectedRoute>
    <Box>
      <Typography sx={{fontWeight:'bold'}}>Dashboard</Typography>
      <Typography>{role}</Typography>
      <Typography>{name}</Typography>
   <Typography sx={{color:'gray'}}>Overview of your spending and recent activity.</Typography>
    </Box>
    </ProtectedRoute>
  )
}

export default page