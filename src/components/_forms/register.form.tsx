'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import style from './register.module.scss';

interface FormValues {
	email: string;
	password: string;
	passwordConfirmation: string;
}
const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		mode: 'onBlur',
		criteriaMode: 'all',
	});

	const [formError, setFormError] = useState<string | null>(null);
	const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
	const signup = handleSubmit(async (data) => {
		const registerRequest = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!registerRequest.ok) {
			switch (registerRequest.status) {
				case 409:
					setFormError('Email already in use');
					break;
				default:
					setFormError('Something went wrong');
			}
			return;
		}

		setRegisterSuccess(true);
	});

	const confirmPassword = () => {
		return (
			watch('password') === watch('passwordConfirmation') ||
			'Passwords do not match'
		);
	};

	if (registerSuccess) {
		return <p>Register Success</p>;
	} else {
		return (
			<form onSubmit={signup} className={style.form}>
				{formError && <p>{formError}</p>}

				<fieldset>
					<legend>Your email </legend>
					<input
						type='email'
						placeholder='Email'
						{...register('email', { required: true })}
					/>
				</fieldset>

				<fieldset>
					<legend>
						Your password
						<span></span>
					</legend>
					<input
						type='password'
						placeholder='Password'
						{...register('password', {
							required: true,
							minLength: 8,
							validate: () => confirmPassword(),
						})}
					/>
					<legend>
						Confirm your password
						<span>just to be sure...</span>
					</legend>
					<input
						type='password'
						placeholder='confirm your password'
						{...register('passwordConfirmation', {
							required: true,
							minLength: 8,
							validate: () => confirmPassword(),
						})}
					/>
				</fieldset>

				<button type='submit'>Register</button>
			</form>
		);
	}
};

export default RegisterForm;
