import RegisterForm from '@/components/_forms/register.form';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

const SignupPage = async () => {
	const session = await getServerSession();

	if (session) {
		return redirect('/');
	}

	return <RegisterForm />;
};

export default SignupPage;
