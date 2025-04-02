import Logo from '@/components/shared/branding/logo';
import { Card, CardHeader, CardContent } from '@hwei/ui/shadcn/card';
import React from 'react';
import SignInForm from '../form/signin-form';

const SignInModal = () => {
	return (
		<Card className="h-full w-full px-12 py-10 shrink-0 lg:min-w-[36rem]">
			<CardHeader className="col-center">
				<Logo />
			</CardHeader>

			<CardContent className="mt-4 mb-6 col-center gap-20">
				<h1 className="text-center text-3xl">Welcome Back</h1>
				<SignInForm />
			</CardContent>
		</Card>
	);
};

export default SignInModal;
