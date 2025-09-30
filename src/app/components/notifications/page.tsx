'use client';
import { Box, Button, Typography, Switch, FormControlLabel, useTheme, Snackbar, Alert } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CommonTitle from '@/app/common/CommonTitle';
import socket from '@/app/utils/socket';
import dayjs from 'dayjs';

interface NotificationType {
  id: number | string;
  title: string;
  message: string;
  time: string;
  read?: boolean;
}

const NotificationCard = ({ title, message, time }: NotificationType) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: '120px',
        width: '100%',
        border: `2px solid ${theme.palette.divider}`,
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
        <span style={{ color: theme.palette.text.secondary, fontSize: '14px' }}>{time}</span>
      </Box>
      <Typography sx={{ color: theme.palette.text.secondary, fontSize: { xs: 12, sm: 14 } }}>{message}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button
          sx={{
            border: `2px solid ${theme.palette.text.secondary}`,
            color: theme.palette.primary.main,
            borderRadius: 2,
            minWidth: { xs: 30, sm: 40 },
          }}
        >
          <DoneAllOutlinedIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
        </Button>
        <Button
          sx={{
            border: `2px solid ${theme.palette.text.secondary}`,
            color: theme.palette.error.main,
            borderRadius: 2,
            minWidth: { xs: 30, sm: 40 },
          }}
        >
          <DeleteOutlinedIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
        </Button>
      </Box>
    </Box>
  );
};

const Page = () => {
  const theme = useTheme();

  // Toggles
  const [inApp, setInApp] = useState(true);
  const [email, setEmail] = useState(false);

  // Toast notification
  const [toast, setToast] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  // Notifications list
  const [notificationsList, setNotificationsList] = useState<NotificationType[]>([]);

  // Socket listener
  useEffect(() => {
    console.log('🔗 Connecting socket...');
    socket.on('notification', (data: any) => {
      console.log('📥 Notification received:', data);

      // Show toast
      setToast({ open: true, message: data.message });

      // Add to in-page notifications
      setNotificationsList(prev => [
        {
          id: Date.now(),
          title: data.title || 'New Notification',
          message: data.message,
          time: dayjs().format('hh:mm A'),
        },
        ...prev,
      ]);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  // Separate today / yesterday
  const todayNotifications = notificationsList.filter(n => dayjs(n.time, 'hh:mm A').isSame(dayjs(), 'day'));
  const yesterdayNotifications = notificationsList.filter(n => dayjs(n.time, 'hh:mm A').isSame(dayjs().subtract(1, 'day'), 'day'));

  return (
    <>
      <CommonTitle title="Notifications" subTitle="Stay on top of bills, budgets, and updates." />

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="info" sx={{ width: '100%' }} onClose={() => setToast({ ...toast, open: false })}>
          {toast.message}
        </Alert>
      </Snackbar>

      {/* Toggles */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, mb: 3 }}>
        <FormControlLabel
          control={<Switch checked={inApp} onChange={() => setInApp(!inApp)} />}
          label="In-App Notifications"
        />
        <FormControlLabel
          control={<Switch checked={email} onChange={() => setEmail(!email)} />}
          label="Email Notifications"
        />
      </Box>

      {/* Today Section */}
      <Box sx={{ mt: 1 }}>
        <Typography sx={{ color: theme.palette.text.secondary, mb: 1, fontSize: { xs: 12, sm: 14 } }}>Today</Typography>
        <Box sx={{ maxHeight: { xs: 250, sm: 400 }, overflowY: 'auto' }}>
          {todayNotifications.length > 0
            ? todayNotifications.map(n => <NotificationCard key={n.id} {...n} />)
            : <Typography sx={{ color: 'gray', fontSize: { xs: 12, sm: 14 } }}>No notifications today.</Typography>
          }
        </Box>
      </Box>

      {/* Yesterday Section */}
      <Box sx={{ mt: 3 }}>
        <Typography sx={{ color: theme.palette.text.secondary, mb: 1, fontSize: { xs: 12, sm: 14 } }}>Yesterday</Typography>
        <Box sx={{ maxHeight: { xs: 200, sm: 300 }, overflowY: 'auto' }}>
          {yesterdayNotifications.length > 0
            ? yesterdayNotifications.map(n => <NotificationCard key={n.id} {...n} />)
            : <Typography sx={{ color: 'gray', fontSize: { xs: 12, sm: 14 } }}>No notifications yesterday.</Typography>
          }
        </Box>
      </Box>
    </>
  );
};

export default Page;
