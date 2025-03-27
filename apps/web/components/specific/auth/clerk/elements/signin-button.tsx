import { Action } from '@clerk/elements/sign-in';
import { Button } from '@hwei/ui/shadcn/button';
import React from 'react';
import { GlobalLoading, LoadingIndicator } from '../sso/clerk-sso';
import { Loading } from '@clerk/elements/common';

const SigninButtton = ({
	isGlobalLoading,
	label,
}: GlobalLoading & { label: string }) => {
	return (
		<Action submit asChild className="h-12 w-fit">
			<Button disabled={isGlobalLoading} className="px-16">
				<Loading>
					{(isLoading) => (isLoading ? <LoadingIndicator /> : label)}
				</Loading>
			</Button>
		</Action>
	);
};

export default SigninButtton;
