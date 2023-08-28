'use client';
import ShorteningInput from '@/components/ShorteningInput';
import Link from 'next/link';


const DashboardPage = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<ShorteningInput />
			<Link href='/dashboard/workspaces'>workspaces</Link>
			<Link href='/dashboard/account'>account</Link>
		</div>
	);
};
export default DashboardPage;
