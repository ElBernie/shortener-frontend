import AuthForm from '@/components/_forms/auth.form';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

const AuthPage = async () => {
	const session = await getServerSession();

	if (session) {
		return redirect('/');
	}

	return <AuthForm />;
};

export default AuthPage;
