import React from 'react';
import Budget from '@/app/components/budgets/index'
import { Typography } from '@mui/material';

const page = () => {
  return (
    <div>
      <Typography sx={{fontSize:'20px',fontWeight:600}}>Budgets</Typography>
            <span style={{color:'gray'}}>Set monthly limits for your categories.</span>
      <Budget/></div>
  )
}

export default page