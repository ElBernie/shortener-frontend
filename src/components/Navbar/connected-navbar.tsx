'use client';
import { useState } from 'react';
import style from './style.module.scss';
import Link from 'next/link';
import WorkspaceSelector from '../WorkspaceSelector';
const ConnectedNavbar = () => {
	const [navbarOpen, setNavbarOpen] = useState(false);
	return (
		<>
			<button
				className={style.navbarSwitch}
				onClick={() => setNavbarOpen(true)}
			>
				X
			</button>

			<nav className={`${style.navbar} ${navbarOpen && style.navbarOpen}`}>
				<button onClick={() => setNavbarOpen(false)}>X</button>
				<ul>
					<li>
						<Link href='/dashboard/workspace'>Workspace</Link>
					</li>
					<li>
						<WorkspaceSelector />
					</li>
					<li>
						<Link href='/dashboard/account'>My account</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default ConnectedNavbar;
