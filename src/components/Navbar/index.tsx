import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import ConnectedNavbar from './connected-navbar';
import style from './style.module.scss';
import NavbarUnconnected from './unconnected-navbar';

const Navbar = async () => {
	const session = await getServerSession(authOptions);
	return (
		<header className={style.header}>
			<span className={style.logo}>{process.env.NEXT_APP_NAME || 'Shrt'}</span>

			{session ? <ConnectedNavbar /> : <NavbarUnconnected />}
		</header>
	);
};

export default Navbar;
