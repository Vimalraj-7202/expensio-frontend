import React from 'react';
import Reports from '@/app/components/reports/index';
import { Typography } from '@mui/material';

const page = () => {
  return (
    <div>
      <Typography sx={{fontSize:'20px',fontWeight:600}}>Reports</Typography>
      <span style={{color:'gray'}}>Visualize your spending patterns.</span>
      <Reports/>
      </div>
  )
}

export default page