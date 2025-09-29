import React from 'react';
import OverView from './OverView';
import DetailedChart from './DetailedChart';
import { Box, Grid } from '@mui/material';
import RecentExpense from './RecentExpense';
// import UpcomingBills from './UpcomingBills';

const index = () => {
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:1}}>
        <OverView/>    
        <DetailedChart/>
        {/* <UpcomingBills/> */}
        <RecentExpense/>
    </Box>
  )
}

export default index