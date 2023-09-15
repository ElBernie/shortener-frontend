'use client';
import Link from 'next/link';
import style from './style.module.scss';
import {
	LuHome,
	LuLink,
	LuChevronRightCircle,
	LuChevronLeftCircle,
	LuUsers2,
} from 'react-icons/lu';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
const DashboardNav = () => {
	const pathname = usePathname();
	const session = useSession();
	const [keepNavbarOpen, setKeepNavbarOpen] = useState(true);
	const [navbarOpen, setNavbarOpen] = useState(true);
	return (
		<div
			className={style.dashboardNavContainer}
			onMouseEnter={() => {
				if (!keepNavbarOpen) {
					setNavbarOpen(true);
				}
			}}
			onMouseLeave={() => {
				if (!keepNavbarOpen) {
					setNavbarOpen(false);
				}
			}}
		>
			<div>
				{keepNavbarOpen ? (
					<LuChevronLeftCircle
						onClick={() => {
							setKeepNavbarOpen(false);
							setNavbarOpen(false);
						}}
					/>
				) : (
					<LuChevronRightCircle onClick={() => setKeepNavbarOpen(true)} />
				)}
			</div>
			<nav>
				<ul>
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
				</ul>
			</nav>
		</div>
	);
};
export default DashboardNav;
