'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.push('/login');
      else if (user.role === 'ADMIN') router.push('/dashboard/admin');
      else if (user.role === 'VENDOR') router.push('/dashboard/vendor');
      else router.push('/dashboard/user');
    }
  }, [user, loading, router]);

  return <div className="text-center py-20">Redirecting...</div>;
}
