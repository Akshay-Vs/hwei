import Blob from '@/components/shared/visual/blob';
import React, { PropsWithChildren } from 'react';

const layout = ({ children }: PropsWithChildren) => {
	return (
		<main className="center flex-col gap-4 text-3xl text-secondary py-4 transition-all duration-300 w-[calc(100vw-8rem)] h-[calc(100vh-6rem)]  ml-24 pl-4 mt-24">
			<div className="absolute top-1/2 right-64 z-[1]">
				<div className="fixed top-1/2 left-1/2 w-[84vw] h-[46vh] rounded-full bg-accent opacity-10 blur-[200px]" />
			</div>

			<Blob />
			<div className="full z-[2]">{children}</div>
		</main>
	);
};

export default layout;
