'use client';
import { useState } from 'react';
import style from './style.module.scss';
import Link from 'next/link';
import WorkspaceSelector from '../WorkspaceSelector';
import { signOut, useSession } from 'next-auth/react';
import { LuMenuSquare } from 'react-icons/lu';
import AccountMenu from '../AccountMenu';

const ConnectedNavbar = () => {
	const session = useSession();
	const [navbarOpen, setNavbarOpen] = useState(false);

	return (
		<>
			<LuMenuSquare
				className={style.navbarSwitch}
				onClick={() => setNavbarOpen(true)}
			/>

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
									<Link
										href='/dashboard/workspace'
										onClick={() => setNavbarOpen(false)}
									>
										Accueil
									</Link>
								</li>
								<li>
									<Link
										href='/dashboard/workspace/links'
										onClick={() => setNavbarOpen(false)}
									>
										Liens
									</Link>
								</li>
								{session?.data?.currentWorkspace?.type === 'PROFESSIONAL' && (
									<li>
										<Link
											href='/dashboard/workspace/members'
											onClick={() => setNavbarOpen(false)}
										>
											Members
										</Link>
									</li>
								)}
							</ul>
						</>
					)}
					<span>Account</span>
					<ul>
						<li>
							<Link
								href='/dashboard/account/settings'
								onClick={() => setNavbarOpen(false)}
							>
								settings
							</Link>
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
					</ul>
				</div>
				<div>
					<Link
						href='/dashboard/workspaces'
						onClick={() => setNavbarOpen(false)}
					>
						Switch workspace
					</Link>
				</div>
			</nav>
			<nav className={`${style.navbar}`}>
				<ul>
					<li>
						<WorkspaceSelector />
					</li>

					<li>
						<AccountMenu />
					</li>
				</ul>
			</nav>
		</>
	);
};

export default ConnectedNavbar;
