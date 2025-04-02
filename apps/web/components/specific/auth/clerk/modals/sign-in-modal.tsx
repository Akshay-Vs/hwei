import Logo from '@/components/shared/branding/logo';
import { Card, CardHeader, CardContent } from '@hwei/ui/shadcn/card';
import React from 'react';
import SignInForm from '../form/signin-form';
import { mode } from '@/types/component-mode';

interface SignInModalProps {
	showLogo?: boolean;
	title?: string;
	mode?: mode;
}

const SignInModal = ({
	showLogo = true,
	mode = 'page',
	title = 'Welcome Back',
}: SignInModalProps) => {
	return (
		<Card className="h-full w-full px-12 py-10 shrink-0 lg:min-w-[36rem]">
			{showLogo && (
				<CardHeader className="col-center">
					<Logo />
				</CardHeader>
			)}

			<CardContent className="mt-4 mb-6 col-center gap-20">
				<h1 className="text-center text-3xl">{title}</h1>
				<SignInForm mode={mode} />
			</CardContent>
		</Card>
	);
};

export default SignInModal;
