import React, { PropsWithChildren } from 'react';

const Dropdown = ({
	isOpen,
	children,
}: { isOpen: boolean } & PropsWithChildren) => {
	return (
		<div
			className={`absolute top-full flex flex-col gap-2 rounded-3xl left-0 w-96 h-fit z-[89] p-4 bg-card/80 backdrop-blur-2xl shadow-lg transition-all duration-300 ease-in-out transform-gpu ${
				isOpen
					? 'opacity-100 scale-100 translate-y-4'
					: 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
			}
        `}
			role="dialog"
			aria-modal="true"
		>
			{children}
		</div>
	);
};

export default Dropdown;
