'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import {
	resetSchema,
	resetSchemaEmail,
	resetSchemaPassword,
	resetSchemaVerification,
} from '../schemas/reset-schema';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@hwei/ui/shadcn/form';
import TextInput from '@/components/shared/input/text-input';
import { Button } from '@hwei/ui/shadcn/button';
import { useSignIn } from '@clerk/nextjs';
import { FormSuccess, FormError } from '../elements/form-status';
import { resolveClerkError } from '../utils/resolve-clerk-error';
import { useRouter } from 'next/navigation';
import { useAuthFlowStore } from '../stores/auth-flow-store';
import PasswordInput from '@/components/shared/input/password-input';

const ResetForm = () => {
	const [isPending, startPending] = useTransition();
	const { isLoaded, signIn, setActive } = useSignIn();
	const router = useRouter();
	const {
		formError,
		formSuccess,
		setFormError,
		setFormSuccess,
		step,
		setStep,
	} = useAuthFlowStore();

	const form = useForm({
		resolver: zodResolver(resetSchema),
		defaultValues: {
			email: '',
			code: '',
			password: '',
			confirmPassword: '',
		},
		mode: 'onChange',
	});

	const sendResetCode = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		e.stopPropagation();

		if (!isLoaded) return;

		startPending(async () => {
			try {
				const startStepData = {
					email: form.getValues('email'),
				};

				await resetSchemaEmail.parseAsync(startStepData);
				await signIn.create({
					strategy: 'reset_password_email_code',
					identifier: startStepData.email,
				});
				setFormSuccess('Verification code sent to your email');
				setStep('verification');
			} catch (error) {
				resolveClerkError({ error, setFormError });
			}
		});
	};

	const verifyResetCode = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		e.stopPropagation();

		if (!isLoaded) return;

		startPending(async () => {
			try {
				const verifyStepData = {
					code: form.getValues('code'),
				};

				await resetSchemaVerification.parseAsync(verifyStepData);
				await signIn.attemptFirstFactor({
					strategy: 'reset_password_email_code',
					code: verifyStepData.code,
				});
				setFormSuccess('');
				setStep('password');
			} catch (error) {
				resolveClerkError({ error, setFormError });
			}
		});
	};

	const resetPassword = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		e.stopPropagation();

		if (!isLoaded) return;

		startPending(async () => {
			try {
				const passwordStepData = {
					password: form.getValues('password'),
					confirmPassword: form.getValues('confirmPassword'),
				};
				await resetSchemaPassword.parseAsync(passwordStepData);

				const res = await signIn.resetPassword({
					password: passwordStepData.password,
				});

				if (res.status !== 'complete') {
					throw new Error('Something went wrong');
				}

				setFormSuccess('Successfully reset password');
				await setActive({ session: signIn.createdSessionId });
				router.push('/');
			} catch (error) {
				resolveClerkError({ error, setFormError });
			}
		});
	};

	// TODO: Add resend code functionality

	return (
		<div className="w-full col gap-16">
			<h1 className="text-center text-3xl">Reset Password</h1>
			<Form {...form}>
				<form className="col gap-8">
					{formSuccess && <FormSuccess message={formSuccess} />}
					{formError && <FormError message={formError} />}
					{step === 'start' ? (
						<>
							<FormField
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<TextInput
												type="email"
												placeholder="Evelinviolet@mail.com"
												disabled={isPending || !isLoaded}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								disabled={!isLoaded}
								loading={isPending}
								className="px-16 h-12"
								onClick={(e) => sendResetCode(e)}
							>
								Send Reset Code
							</Button>
						</>
					) : null}

					{step === 'verification' ? (
						<>
							<FormField
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Verification Code</FormLabel>
										<FormControl>
											<TextInput
												type="text"
												placeholder="123456"
												disabled={isPending || !isLoaded}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								disabled={!isLoaded}
								loading={isPending}
								className="px-16 h-12"
								onClick={(e) => verifyResetCode(e)}
							>
								Verify
							</Button>
						</>
					) : null}

					{step === 'password' ? (
						<>
							<FormField
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<PasswordInput
												placeholder="Password"
												disabled={isPending || !isLoaded}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<TextInput
												type="password"
												placeholder="Confirm Password"
												disabled={isPending || !isLoaded}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								disabled={!isLoaded}
								loading={isPending}
								className="px-16 h-12"
								onClick={(e) => resetPassword(e)}
							>
								Reset Password
							</Button>
						</>
					) : null}
				</form>
			</Form>
		</div>
	);
};

export default ResetForm;
