import Logo from '@/components/shared/branding/logo';
import { Card, CardHeader, CardContent } from '@hwei/ui/shadcn/card';
import React from 'react';
import SignUpForm from '../form/signup-form';
import VerificationForm from '../form/verification-form';
import { useAuthFlowStore } from '../stores/auth-flow-store';

const SignUpModal = () => {
	const { step } = useAuthFlowStore();

	return (
		<Card className="h-full w-full px-12 py-10 shrink-0 lg:min-w-[36rem] overflow-hidden">
			<CardHeader className="col-center">
				<Logo />
			</CardHeader>

			<CardContent className="mt-4 mb-6 col-center">
				{step === 'verification' ? <VerificationForm /> : <SignUpForm />}
			</CardContent>
		</Card>
	);
};

export default SignUpModal;
