import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/admin/AdminDashboard';

async function getStats() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/admin/stats`, {
      cache: 'no-store',
      headers: {
        Cookie: '', // Will be set by the browser
      },
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/');
  }

  const statsData = await getStats();

  return <AdminDashboard initialStats={statsData} />;
}
