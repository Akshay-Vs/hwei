'use client';

import Logo from '@/components/shared/branding/logo';
import SignInForm from '@/components/specific/auth/clerk/form/signin-form';
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from '@hwei/ui/shadcn/card';
export default function SignInPage() {
	return (
		<div className="full relative">
			<Card className="h-full w-full px-12 py-10 shrink-0 lg:min-w-[36rem]">
				<CardHeader className="col-center">
					<Logo />
				</CardHeader>

				<CardContent className="mt-4 mb-6 col-center gap-20">
					<h1 className="text-center text-3xl">Welcome Back</h1>
					<SignInForm />
				</CardContent>

				{/* <CardFooter className="w-full center absolute bottom-4 right-0">
					<p className="text-center text-xs">Designed and developed by akvs</p>
				</CardFooter> */}
			</Card>
		</div>
	);
}
