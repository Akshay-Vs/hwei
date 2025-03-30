import TextInput from '@/components/shared/input/text-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@hwei/ui/shadcn/button';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@hwei/ui/shadcn/form';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signupSchemaVerification } from '../schemas/signup-schema';
import { useSignUp } from '@clerk/nextjs';
import { useAuthFlowStore } from '../stores/auth-flow-store';
import { useRouter } from 'next/navigation';
import { FormError, FormSuccess } from '../elements/form-status';
import { resolveClerkError } from '../utils/resolve-clerk-error';

const VerificationForm = () => {
	const { isLoaded, signUp, setActive } = useSignUp();
	const [isPending, startPending] = useTransition();
	const { setStep, formSuccess, formError, setFormError, setFormSuccess } =
		useAuthFlowStore();
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(signupSchemaVerification),
		defaultValues: {
			code: '',
		},
		mode: 'onChange',
	});
	const onVerify = (values: z.infer<typeof signupSchemaVerification>) => {
		if (!isLoaded) return;

		startPending(async () => {
			try {
				// Attempt verification
				const verifiedCode = signupSchemaVerification.safeParse(values);
				if (verifiedCode.error) {
					// Handle validation error
					form.setError('code', {
						message: 'Invalid verification code',
					});
					return;
				}

				await signUp.attemptEmailAddressVerification({
					code: verifiedCode.data.code,
				});
				await setActive({ session: signUp.createdSessionId });
				setFormSuccess('Successfully verified email address');
				router.push('/');
			} catch (error: any) {
				resolveClerkError({ error, setFormError });
			}
		});
	};

	return (
		<div className="w-full col gap-16">
			<h1 className="text-center text-3xl">Welcome Abroad</h1>
			<Form {...form}>
				<form className="col gap-6" onSubmit={form.handleSubmit(onVerify)}>
					{formSuccess && <FormSuccess message={formSuccess} />}
					{formError && <FormError message={formError} />}
					<>
						<FormField
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Verification Code</FormLabel>
									<FormControl>
										<TextInput type="text" placeholder="123456" {...field} />
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
								Verify
							</Button>
						</div>
					</>
				</form>
			</Form>
		</div>
	);
};

export default VerificationForm;
