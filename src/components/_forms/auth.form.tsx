'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import style from './auth.module.scss';
const AuthForm = ({ redirect }: { redirect?: string }) => {
	const router = useRouter();
	const { register, handleSubmit } = useForm();
	const [formError, setFormError] = useState<string | null>(null);

	const login = handleSubmit(async (data) => {
		const loginData = await signIn('credentials', {
			redirect: true,
			email: data.email,
			password: data.password,
			callbackUrl: redirect ? redirect : '/dashboard',
		});

		if (loginData?.error) {
			setFormError('Invalid credentials');
		}
	});

	return (
		<form onSubmit={login} className={style.form}>
			<fieldset>
				<legend>Email</legend>

				<input
					type='email'
					placeholder='Email'
					{...register('email', { required: true })}
				/>
			</fieldset>

			<fieldset>
				<legend>Password</legend>

				<input
					type='password'
					placeholder='Password'
					{...register('password', { required: true })}
				/>
			</fieldset>

			<button type='submit'>Login</button>
			{formError && <p>{formError}</p>}
		</form>
	);
};

export default AuthForm;
