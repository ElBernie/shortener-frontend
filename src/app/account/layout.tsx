'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
	const session = useSession();
	if (!session?.data?.user && session?.status != 'loading') {
		redirect('/auth/signin');
	}

	if (session && session.status == 'loading') {
		return <>loading account...</>;
	} else {
		return (
			<>
				{JSON.stringify(session)}
				{children}
			</>
		);
	}
};
export default AccountLayout;
