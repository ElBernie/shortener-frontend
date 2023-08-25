'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const session = useSession();
	if (!session?.data?.user && session?.status != 'loading') {
		redirect('/auth/signin');
	}

	if (session && session.status == 'loading') {
		return <>loading account...</>;
	} else {
		return <>{children}</>;
	}
};
export default DashboardLayout;
