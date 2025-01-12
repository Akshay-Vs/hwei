import React, { PropsWithChildren } from 'react';

const layout = ({ children }: PropsWithChildren) => {
	return (
		<main className="center flex-col gap-4 text-3xl text-secondary  py-4 transition-all duration-300 w-[calc(100vw-7rem)] h-[calc(100vh-6rem)] ml-28 mt-24">
			{children}
		</main>
	);
};

export default layout;
