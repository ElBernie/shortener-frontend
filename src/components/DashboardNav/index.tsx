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
import { useEffect, useRef, useState } from 'react';
const DashboardNav = () => {
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
					<li>
						<LuHome />
						{navbarOpen && <Link href='/dashboard/workspace'>Accueil</Link>}
					</li>
					<li>
						<LuLink />
						{navbarOpen && <Link href='/dashboard/workspace/links'>Liens</Link>}
					</li>
					<li>
						<LuUsers2 />
						{navbarOpen && (
							<Link href='/dashboard/workspace/members'>Members</Link>
						)}
					</li>
				</ul>
			</nav>
		</div>
	);
};
export default DashboardNav;
