import Logo from '@/components/shared/branding/logo';
import { Card, CardHeader, CardContent } from '@hwei/ui/shadcn/card';
import React from 'react';
import SignUpForm from '../form/signup-form';
import VerificationForm from '../form/verification-form';
import { useAuthFlowStore } from '../stores/auth-flow-store';
import { TMode } from '@/types/component-mode';

interface SignInModalProps {
	showLogo?: boolean;
	mode?: TMode;
}

const SignUpModal = ({ showLogo = true, mode = 'page' }: SignInModalProps) => {
	const { step } = useAuthFlowStore();

	return (
		<Card className="h-full w-full px-12 py-10 shrink-0 lg:min-w-[36rem] overflow-hidden">
			{showLogo && (
				<CardHeader className="col-center">
					<Logo />
				</CardHeader>
			)}

			<CardContent className="mt-4 mb-6 col-center">
				{step === 'verification' ? (
					<VerificationForm />
				) : (
					<SignUpForm mode={mode} />
				)}
			</CardContent>
		</Card>
	);
};

export default SignUpModal;
