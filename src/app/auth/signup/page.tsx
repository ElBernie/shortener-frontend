import RegisterForm from '@/components/_forms/register.form';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';
import style from './style.module.scss';
const SignupPage = async () => {
	const session = await getServerSession();

	if (session) {
		return redirect('/');
	}

	return (
		<div className={style.registerHolder}>
			<h1>Bienvenue à bord !</h1>
			<RegisterForm />
		</div>
	);
};

export default SignupPage;
