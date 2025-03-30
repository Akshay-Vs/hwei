import Logo from '@/components/shared/branding/logo';
import ResetForm from '@/components/specific/auth/clerk/form/reset-form';
import { Card, CardHeader, CardContent } from '@hwei/ui/shadcn/card';
import React from 'react';

const ResetPasswordPage = () => {
	return (
		<div className="full relative">
			<Card className="h-full w-full px-12 py-10 shrink-0 lg:min-w-[36rem]">
				<CardHeader className="col-center">
					<Logo />
				</CardHeader>

				<CardContent className="mt-4 mb-6 col-center gap-20">
					<ResetForm />
				</CardContent>

				{/* <CardFooter className="w-full center absolute bottom-4 right-0">
            <p className="text-center text-xs">Designed and developed by akvs</p>
          </CardFooter> */}
			</Card>
		</div>
	);
};

export default ResetPasswordPage;
