import AuthForm from '@/components/_forms/auth.form';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import style from './style.module.scss';

const AuthPage = async ({
	searchParams,
}: {
	searchParams?: {
		redirect?: string;
	};
}) => {
	const session = await getServerSession();

	if (session) {
		return redirect('/');
	}

	return (
		<div className={style.loginHolder}>
			<h1>Heureux de vous revoir !</h1>
			<AuthForm redirect={searchParams?.redirect} />
		</div>
	);
};

export default AuthPage;
