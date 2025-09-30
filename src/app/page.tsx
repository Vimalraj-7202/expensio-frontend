'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/app/hooks/redux';
import { setAuth } from '@/app/store/auth/auth.slice';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function HomePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken && !user) {
      dispatch(setAuth({ user: JSON.parse(savedUser), token: savedToken }));
    }

    const finalToken = savedToken || token;
    if (finalToken) {
      router.replace('/dashboard');
    } else {
      router.replace('/auth/login');
    }
    }, []);

  if (!mounted) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Redirecting...
      </Typography>
    </Box>
  );
}
