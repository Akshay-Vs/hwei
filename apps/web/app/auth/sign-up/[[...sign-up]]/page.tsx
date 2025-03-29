'use client';
import Logo from '@/components/shared/branding/logo';
import SignUpForm from '@/components/specific/auth/clerk/form/signup-form';
import VerificationForm from '@/components/specific/auth/clerk/form/verification-form';
import { useSignUpFlowStore } from '@/components/specific/auth/clerk/stores/signup-flow-store';
import { Card, CardHeader, CardContent } from '@hwei/ui/shadcn/card';
import React from 'react';

const SignUpPage = () => {
	const { step } = useSignUpFlowStore();

	return (
		<div className="full relative">
			<Card className="h-full w-full px-12 py-10 shrink-0 lg:min-w-[36rem] overflow-hidden">
				<CardHeader className="col-center">
					<Logo />
				</CardHeader>

				<CardContent className="mt-4 mb-6 col-center">
					{step === 'verification' ? <VerificationForm /> : <SignUpForm />}
				</CardContent>
			</Card>
		</div>
	);
};

export default SignUpPage;
