import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import SocialProviders from '@/components/specific/auth/clerk/elements/social-providers';
import EmailInput from '@/components/specific/auth/clerk/elements/email-input';
import PasswordInput from '../elements/password-input';
import SigninButtton from '../elements/signin-button';
import ResetPasswordButton from '../elements/reset-password-button';
import CreateAccButton from '../elements/create-acc-button';

const SignInForm = () => {
	return (
		<SignIn.Root>
			<Clerk.Loading>
				{(isGlobalLoading) => (
					<>
						<SignIn.Step name="start" className="w-full col-center">
							<div className="w-full col gap-6">
								<EmailInput />
								<div className="flex items-center justify-between px-1">
									<CreateAccButton />
									<SigninButtton
										label="Continue"
										isGlobalLoading={isGlobalLoading}
									/>
								</div>
							</div>
						</SignIn.Step>

						<SignIn.Step name="verifications" className="w-full col-center">
							<div className="w-full col gap-8">
								<PasswordInput />
								<div className="flex items-center justify-between">
									<ResetPasswordButton />
									<SigninButtton
										label="Signin"
										isGlobalLoading={isGlobalLoading}
									/>
								</div>
							</div>
						</SignIn.Step>

						<SignIn.Step name="forgot-password">
							<SignIn.SupportedStrategy name="reset_password_email_code">
								Reset your password via Email
							</SignIn.SupportedStrategy>
						</SignIn.Step>
						<SocialProviders isGlobalLoading={isGlobalLoading} />
					</>
				)}
			</Clerk.Loading>
		</SignIn.Root>
	);
};

export default SignInForm;
