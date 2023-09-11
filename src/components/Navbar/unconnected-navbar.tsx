'use client';
import { useState } from 'react';
import style from './style.module.scss';
import Link from 'next/link';
const NavbarUnconnected = () => {
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
						<Link href='/auth/signin' onClick={() => setNavbarOpen(false)}>
							Sign in
						</Link>
					</li>
					<li>
						<Link href='/auth/signup' onClick={() => setNavbarOpen(false)}>
							Register
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default NavbarUnconnected;
