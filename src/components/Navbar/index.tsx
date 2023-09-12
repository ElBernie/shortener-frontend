import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import ConnectedNavbar from './connected-navbar';
import style from './style.module.scss';
import NavbarUnconnected from './unconnected-navbar';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
const poppins = Poppins({ weight: ['700'], subsets: ['latin-ext'] });
const Navbar = async () => {
	const session = await getServerSession(authOptions);
	return (
		<header className={style.header}>
			<span className={`${style.logo} ${poppins.className}`}>
				<Link href='/' style={{ all: 'inherit' }}>
					{process.env.NEXT_APP_NAME || 'Shrt'}
				</Link>
			</span>

			{session ? <ConnectedNavbar /> : <NavbarUnconnected />}
		</header>
	);
};

export default Navbar;
