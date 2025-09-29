import React from 'react';
import OverView from './OverView';
import Filter from './Filter';
import CategoryChart from './CategoryTotal';
import { Box, Container } from '@mui/material';

const Page = () => {
  return (
    <Container maxWidth="xl" sx={{ py:2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3, md:2 },
        }}
      >
        {/* Overview Cards */}
        <OverView />

        {/* Filter Section */}
        <Filter />

        {/* Category Total Chart */}
        <CategoryChart />
      </Box>
    </Container>
  );
};

export default Page;
