'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/app/hooks/redux';
import { setAuth } from '@/app/store/auth/auth.slice';

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

    if (savedToken || token) {
      router.replace('/dashboard');
    } else {
      router.replace('/auth/login');
    }
  }, [dispatch, router, token, user]);

  if (!mounted) return null; // ✅ Prevents hydration mismatch

  return null;
}
