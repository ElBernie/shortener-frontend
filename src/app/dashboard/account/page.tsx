import WorkspaceSelector from '@/components/WorkspaceSelector';
import Link from 'next/link';
const AccountPage = () => {
	return (
		<>
			<Link href='/dashboard/'>Dashboard</Link>
			<Link href='/dashboard/account/links'>My links</Link>
			<Link href='/dashboard/account/settings'>Account settings</Link>
			<WorkspaceSelector />
		</>
	);
};
export default AccountPage;
