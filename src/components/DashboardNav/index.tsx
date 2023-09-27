'use client';
import Link from 'next/link';
import style from './style.module.scss';
import {
	LuHome,
	LuLink,
	LuChevronRightCircle,
	LuChevronLeftCircle,
	LuUsers2,
	LuBadgePlus,
	LuSettings,
} from 'react-icons/lu';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { hasUserPermission } from '@/helpers';

const DashboardNav = () => {
	const pathname = usePathname();
	const session = useSession();

	const [navbarOpen, setNavbarOpen] = useState(false);
	return (
		<div
			className={style.dashboardNavContainer}
			onMouseEnter={() => {
				setNavbarOpen(true);
			}}
			onMouseLeave={() => {
				setNavbarOpen(false);
			}}
		>
			<nav>
				<ul>
					<li className={`${style.activeLink} ${style.createButton}`}>
						<Link href='/dashboard/workspace/create'>
							<LuBadgePlus />
							{navbarOpen && <span>Create</span>}
						</Link>
					</li>
					<li
						className={
							pathname == '/dashboard/workspace' ? style.activeLink : undefined
						}
					>
						<Link href='/dashboard/workspace'>
							<LuHome />
							{navbarOpen && <span>Accueil</span>}
						</Link>
					</li>
					<li
						className={
							pathname == '/dashboard/workspace/links'
								? style.activeLink
								: undefined
						}
					>
						<Link href='/dashboard/workspace/links'>
							<LuLink />
							{navbarOpen && <span>Links</span>}
						</Link>
					</li>
					{session.data?.currentWorkspace.type == 'PROFESSIONAL' && (
						<li
							className={
								pathname == '/dashboard/workspace/members'
									? style.activeLink
									: undefined
							}
						>
							<Link href='/dashboard/workspace/members'>
								<LuUsers2 />
								{navbarOpen && <span>Members</span>}
							</Link>
						</li>
					)}
					{hasUserPermission({
						session: session.data,
						permission: 'workspaceEdit',
					}) && (
						<li
							className={
								pathname == '/dashboard/workspace/settings'
									? style.activeLink
									: undefined
							}
						>
							<Link href='/dashboard/workspace/settings'>
								<LuSettings />
								{navbarOpen && <span>Settings</span>}
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</div>
	);
};
export default DashboardNav;
