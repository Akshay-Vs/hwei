import React, { PropsWithChildren } from 'react';

const layout = ({ children }: PropsWithChildren) => {
	return (
		<main className="center gap-4 w-full h-[89vh] text-3xl text-secondary">
			{children}
		</main>
	);
};

export default layout;
