'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const router = useRouter();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return; // wait for hydration

    // Not logged in
    if (!token) {
      router.replace('/auth/login');
      return;
    }

    // Logged in but role not allowed
    if (roles && user && !roles.includes(user.role)) {
      router.replace('/404');
      return;
    }
  }, [hydrated, token, user, roles, router]);

  // Don't render children until checks are done
  if (!hydrated || !token || (roles && user && !roles.includes(user.role))) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
