import React, { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<main className="h-screen w-full py-5 center">
			<div className="h-full w-full lg:h-3/4 lg:w-1/3">{children}</div>
		</main>
	);
};

export default AuthLayout;
