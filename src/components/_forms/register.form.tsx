'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import style from './register.module.scss';
import { registerAction } from '@/actions/auth/register.action';

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
		try {
			const registerData = await registerAction(data.email, data.password);
			setRegisterSuccess(true);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
				switch (error.message) {
					case 'EMAIL_ALREADY_IN_USE': {
						setFormError('EMAIL_ALREADY_IN_USE');
						break;
					}
					default: {
						setFormError('Something went wrong');
						break;
					}
				}
			}
		}
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
					<div>
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
					</div>

					<div>
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
					</div>
				</fieldset>

				<button type='submit'>Register</button>
			</form>
		);
	}
};

export default RegisterForm;
