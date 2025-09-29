'use client'
import { Box, Button, Typography, Switch, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const notifications = {
  today: [
    { id: 1, title: 'Groceries budget at 85%', message: 'You are close to your monthly limit', time: '2:30 PM' },
    { id: 2, title: 'Electricity bill due soon', message: 'Payment due in 3 days', time: '10:15 AM' },
    { id: 3, title: 'New budget created: Entertainment', message: 'Set monthly limit to $200', time: '9:00 AM' },
    { id: 4, title: 'Subscription payment processed', message: 'Netflix subscription renewed', time: '8:45 AM' },
  ],
  yesterday: [
    { id: 5, title: 'Car maintenance expense logged', message: 'Scheduled for next week', time: '6:30 PM' },
    { id: 6, title: 'Income added to savings', message: 'Salary credited', time: '5:00 PM' },
  ],
};

const NotificationCard = ({ title, message, time }: any) => (
  <Box
    sx={{
      height: '120px',
      width: '100%',
      border: '3px solid #e2e8f0',
      borderRadius: '10px',
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      mb: 2,
      boxSizing: 'border-box',
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>{title}</Typography>
      <span style={{ color: 'gray', fontSize: '14px' }}>{time}</span>
    </Box>
    <Typography sx={{ color: 'gray', fontSize: { xs: 12, sm: 14 } }}>{message}</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
      <Button sx={{ border: '2px solid gray', color: '#14ab78', borderRadius: 2, minWidth: { xs: 30, sm: 40 } }}>
        <DoneAllOutlinedIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
      </Button>
      <Button sx={{ border: '2px solid gray', color: 'red', borderRadius: 2, minWidth: { xs: 30, sm: 40 } }}>
        <DeleteOutlinedIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
      </Button>
    </Box>
  </Box>
);

const Page = () => {
  const [inApp, setInApp] = useState(true);
  const [email, setEmail] = useState(false);

  return (
    <>
  <Typography sx={{ fontSize: { xs: 12, sm: 14 ,lg:20}, fontWeight: 600 }}>
  Notifications
</Typography>

<span style={{ color: 'gray', display: 'block', fontSize: '16px', marginBottom: 2 }}>
  Stay on top of bills, budgets, and updates.
</span>

      {/* Toggles */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={inApp}
              onChange={() => setInApp(!inApp)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#14ab78',
                  '&:hover': { backgroundColor: 'rgba(20, 171, 120, 0.08)' },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#14ab78' },
              }}
            />
          }
          label="In-App Notifications"
        />
        <FormControlLabel
          control={
            <Switch
              checked={email}
              onChange={() => setEmail(!email)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#14ab78',
                  '&:hover': { backgroundColor: 'rgba(20, 171, 120, 0.08)' },
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#14ab78' },
              }}
            />
          }
          label="Email Notifications"
        />
      </Box>

      {/* Today Section */}
      <Box sx={{ mt: 1 }}>
        <Typography sx={{ color: 'gray', mb: 1, fontSize: { xs: 12, sm: 14 } }}>Today</Typography>
        <Box sx={{ maxHeight: { xs: 250, sm: 400 }, overflowY: 'auto' }}>
          {notifications.today.map(({ id, title, message, time }) => (
            <NotificationCard key={id} title={title} message={message} time={time} />
          ))}
        </Box>
      </Box>

      {/* Yesterday Section */}
      <Box sx={{ mt: 3 }}>
        <Typography sx={{ color: 'gray', mb: 1, fontSize: { xs: 12, sm: 14 } }}>Yesterday</Typography>
        <Box sx={{ maxHeight: { xs: 200, sm: 300 }, overflowY: 'auto' }}>
          {notifications.yesterday.map(({ id, title, message, time }) => (
            <NotificationCard key={id} title={title} message={message} time={time} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Page;
