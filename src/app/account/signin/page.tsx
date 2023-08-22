import AuthForm from '@/components/forms/auth.form';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const AuthPage = async () => {
	const session = await getServerSession();

	if (session) {
		return redirect('/');
	}

	return <AuthForm />;
};

export default AuthPage;
