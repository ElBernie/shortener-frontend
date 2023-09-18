'use client';
import { useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { LuUser2 } from 'react-icons/lu';

const AccountMenu = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [showMenu, setShowMenu] = useState(false);
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setShowMenu(false);
			}
		};
		document.addEventListener('click', handleClick, true);
		return () => {
			document.removeEventListener('click', handleClick, true);
		};
	}, []);

	return (
		<div
			className={style.accountMenuContainer}
			ref={ref}
			onClick={() => setShowMenu((currentState) => !currentState)}
			onBlur={() => setShowMenu(false)}
		>
			<div className={style.accountMenuButton}>
				<LuUser2 />
			</div>
			{showMenu && (
				<ul className={style.accountMenuPanel}>
					<li>
						<Link href='/dashboard/account'>My account</Link>
					</li>
					<li>
						<Link href='/dashboard/account/settings'>Settings</Link>
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
			)}
		</div>
	);
};

export default AccountMenu;
