'use client';
import { useState } from 'react';
import style from './style.module.scss';
import Link from 'next/link';
import { LuMenuSquare } from 'react-icons/lu';

const NavbarUnconnected = () => {
	const [navbarOpen, setNavbarOpen] = useState(false);
	return (
		<>
			<LuMenuSquare
				className={style.navbarSwitch}
				onClick={() => setNavbarOpen(true)}
			/>

			<nav
				className={`${style.navbarMobile} ${navbarOpen && style.navbarOpen}`}
			>
				<button onClick={() => setNavbarOpen(false)}>X</button>
				<div>
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
				</div>
			</nav>

			<nav className={`${style.navbar}`}>
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
