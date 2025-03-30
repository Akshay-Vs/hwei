'use client';
import React, { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSignUp } from '@clerk/nextjs';
import { Button } from '@hwei/ui/shadcn/button';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@hwei/ui/shadcn/form';

import TextInput from '@/components/shared/input/text-input';
import SocialProviders from '../elements/social-providers';
import { useAuthFlowStore } from '../stores/auth-flow-store';
import { signupSchema, signupSchemaStart } from '../schemas/signup-schema';
import AlreadyHaveAcc from '../elements/already-have-acc';
import { FormError, FormSuccess } from '../elements/form-status';
import { resolveClerkError } from '../utils/resolve-clerk-error';

const SignUpForm = () => {
	const { isLoaded, signUp } = useSignUp();
	const {
		step,
		setStep,
		formSuccess,
		formError,
		setFormError,
		setFormSuccess,
	} = useAuthFlowStore();
	const [isPending, startPending] = useTransition();

	const form = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			identifier: '',
			password: '',
			confirmPassword: '',
			fullName: '',
		},
		mode: 'onChange',
	});

	const validateStart = async () => {
		try {
			const startStepData = {
				fullName: form.getValues('fullName'),
				identifier: form.getValues('identifier'),
			};
			await signupSchemaStart.parseAsync(startStepData);

			setStep('password');
		} catch (error) {
			form.trigger(['fullName', 'identifier']);
		}
	};

	const onSubmit = async (values: z.infer<typeof signupSchema>) => {
		if (!isLoaded) return;

		startPending(async () => {
			try {
				console.log(values);
				await signUp.create({
					emailAddress: values.identifier,
					password: values.password,
					firstName: values.fullName.split(' ')[0],
					lastName: values.fullName.split(' ').slice(1).join(' '),
				});

				await signUp.prepareEmailAddressVerification({
					strategy: 'email_code',
				});
				setFormSuccess('Verification code sent to your email');
				setStep('verification');
			} catch (error) {
				resolveClerkError({ error, setFormError });
			}
		});
	};

	return (
		<div className="w-full col gap-16">
			<h1 className="text-center text-3xl">Welcome Abroad</h1>

			<Form {...form}>
				<form className="col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
					{formSuccess && <FormSuccess message={formSuccess} />}
					{formError && <FormError message={formError} />}

					{step === 'start' && (
						<>
							<FormField
								name="fullName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<TextInput
												disabled={!isLoaded}
												type="text"
												placeholder="Evelin Violet"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								name="identifier"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<TextInput
												disabled={!isLoaded}
												type="email"
												placeholder="Evelinviolet@mail.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex items-center justify-between mt-2">
								<AlreadyHaveAcc />
								<Button
									onClick={(e) => {
										e.preventDefault();
										validateStart();
									}}
									className="px-16 h-12"
									disabled={!isLoaded}
									loading={isPending}
								>
									Continue
								</Button>
							</div>
						</>
					)}

					{step === 'password' && (
						<>
							<FormField
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<TextInput
												type="password"
												placeholder="********"
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
												placeholder="********"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex items-center justify-between mt-2">
								<Button
									variant="ghost"
									onClick={(e) => {
										e.stopPropagation();
										setStep('start');
									}}
									className="text-sm"
								>
									Go back
								</Button>
								<Button
									type="submit"
									className="px-16 h-12"
									disabled={!isLoaded}
									loading={isPending}
								>
									Signup
								</Button>
							</div>

							<div className="h-fit w-full center">
								<div id="clerk-captcha" />
							</div>
						</>
					)}
				</form>
			</Form>

			<SocialProviders />
		</div>
	);
};

export default SignUpForm;
