import DashboardNav from '@/components/DashboardNav';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				flexGrow: 1,
				gap: '1rem',
			}}
		>
			<DashboardNav />
			<div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
		</div>
	);
}
