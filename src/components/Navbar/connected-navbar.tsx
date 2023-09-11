'use client';
import { useState } from 'react';
import style from './style.module.scss';
import Link from 'next/link';
import WorkspaceSelector from '../WorkspaceSelector';
import { signOut, useSession } from 'next-auth/react';

const ConnectedNavbar = () => {
	const session = useSession();
	const [navbarOpen, setNavbarOpen] = useState(false);
	return (
		<>
			<button
				className={style.navbarSwitch}
				onClick={() => setNavbarOpen(true)}
			>
				X
			</button>

			<nav
				className={`${style.navbarMobile}  ${navbarOpen && style.navbarOpen}`}
			>
				<button onClick={() => setNavbarOpen(false)}>X</button>
				<div>
					{session?.data?.currentWorkspace && (
						<>
							<span>Workspace</span>
							<ul>
								<li>
									<Link href='/dashboard/workspace'>Workspace</Link>
								</li>
								<li>
									<Link href='/dashboard/workspace/links'>Liens</Link>
								</li>
								{session?.data?.currentWorkspace?.type === 'PROFESSIONAL' && (
									<li>Members</li>
								)}
							</ul>
						</>
					)}
				</div>
			</nav>
			<nav className={`${style.navbar}`}>
				<ul>
					<li>
						<Link href='/dashboard/workspace'>Workspace</Link>
					</li>
					<li>
						<WorkspaceSelector />
					</li>
					<li>
						<Link
							href={'/'}
							onClick={async () => {
								await signOut({ redirect: true, callbackUrl: '/' });
							}}
						>
							Log out
						</Link>
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
