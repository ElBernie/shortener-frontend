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

const PasswordValidator = ({ password }: { password: string }) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{password.length < 8 && <span>At least 8 characters</span>}
			{new RegExp(/[A-Z]/).test(password) == false && (
				<span>At least 1 uppercase</span>
			)}
			{new RegExp(/\d/).test(password) == false && (
				<span>At least 1 number</span>
			)}
			{new RegExp(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-|=]/).test(password) ==
				false && <span>At least one special character</span>}
		</div>
	);
};
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
								minLength: {
									value: 8,
									message: 'Password must be at least 8 characters long',
								},
								validate: {
									atLeastOneUppercase: (value) =>
										new RegExp(/[A-Z]/).test(value) == true ||
										'Password must contain at least one uppercase',
									atLeastOneNumber: (value) =>
										new RegExp(/\d/).test(value) == true ||
										'Password must contain at least one number',
									atLeastOneSpecialCharacter: (value) =>
										new RegExp(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-|=]/).test(
											value
										) == true ||
										'Password must contain at least one special character',
								},
							})}
						/>
						{watch('password')?.length > 0 && (
							<PasswordValidator password={watch('password')} />
						)}
						{errors.password?.message && <p>{errors.password.message}</p>}
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
						{watch('password') === watch('passwordConfirmation') ||
							'Passwords do not match'}
					</div>
				</fieldset>

				<button type='submit'>Register</button>
			</form>
		);
	}
};

export default RegisterForm;
