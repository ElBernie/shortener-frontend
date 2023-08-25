import WorkspaceSelector from '@/components/WorkspaceSelector';
import Link from 'next/link';
const AccountPage = () => {
	return (
		<>
			<Link href='/account/links'>My links</Link>
			<Link href='/account/settings'>Account settings</Link>
			<WorkspaceSelector />
		</>
	);
};
export default AccountPage;
