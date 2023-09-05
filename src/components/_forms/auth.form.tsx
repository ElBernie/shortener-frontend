'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AuthForm = ({ redirect }: { redirect?: string }) => {
	const router = useRouter();
	const { register, handleSubmit } = useForm();
	const [formError, setFormError] = useState<string | null>(null);

	const login = handleSubmit(async (data) => {
		const loginData = await signIn('credentials', {
			redirect: false,
			email: data.email,
			password: data.password,
		});

		if (loginData?.error) {
			setFormError('Invalid credentials');
		} else {
			router.push(redirect ? redirect : '/');
		}
	});

	return (
		<form onSubmit={login}>
			<input
				type='email'
				placeholder='Email'
				{...register('email', { required: true })}
			/>
			<input
				type='password'
				placeholder='Password'
				{...register('password', { required: true })}
			/>
			<button type='submit'>Login</button>
			{formError && <p>{formError}</p>}
		</form>
	);
};

export default AuthForm;
