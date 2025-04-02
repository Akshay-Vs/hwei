import React, { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@hwei/ui/shadcn/button';
import { useForm } from 'react-hook-form';
import { useSignIn } from '@clerk/nextjs';
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

import { signinSchema } from '../schemas/signin-schema';
import { useAuthFlowStore } from '../stores/auth-flow-store';
import { FormSuccess, FormError } from '../elements/form-status';
import CreateAcc from '../elements/create-acc';
import SocialProviders from '../elements/social-providers';
import ResetPasswordLink from '../elements/reset-password-link';
import { resolveClerkError } from '../utils/resolve-clerk-error';
import PasswordInput from '@/components/shared/input/password-input';

const SignInForm = () => {
	const { formSuccess, formError, setFormSuccess, setFormError } =
		useAuthFlowStore();
	const { isLoaded, signIn, setActive } = useSignIn();
	const [isPending, startPending] = useTransition();

	const form = useForm({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			identifier: '',
			password: '',
		},
		mode: 'onChange',
	});

	const onSubmit = (values: z.infer<typeof signinSchema>) => {
		if (!isLoaded) {
			return;
		}

		startPending(async () => {
			try {
				const result = await signIn.create({
					identifier: values.identifier,
					password: values.password,
				});

				if (result.status !== 'complete') {
					throw new Error('Sign in failed');
				}

				setFormSuccess('Signed in successfully');
				setActive({ session: signIn.createdSessionId });
			} catch (error) {
				resolveClerkError({ error, setFormError });
			}
		});
	};

	return (
		<div className="w-full col gap-8">
			<Form {...form}>
				<form className="col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
					{formSuccess && <FormSuccess message={formSuccess} />}
					{formError && <FormError message={formError} />}
					<FormField
						name="identifier"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<TextInput
										type="email"
										placeholder="Evelinviolet@mail.com"
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<PasswordInput
										placeholder="••••••••"
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex items-center justify-between mt-2">
						<CreateAcc />
						<Button
							className="px-16 h-12"
							disabled={!isLoaded}
							loading={isPending}
						>
							SignIn
						</Button>
					</div>

					<div className="h-fit w-full center">
						<div id="clerk-captcha" />
					</div>
				</form>
			</Form>

			<div>
				<ResetPasswordLink />
			</div>

			<SocialProviders />
		</div>
	);
};

export default SignInForm;
