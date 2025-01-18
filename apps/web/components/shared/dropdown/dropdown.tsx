import { cn } from '@hwei/ui/utils/cn';
import React, { PropsWithChildren } from 'react';

interface DropdownProps extends PropsWithChildren {
	isOpen: boolean;
	className?: string;
}

const Dropdown = ({ isOpen, children, className }: DropdownProps) => {
	return (
		<div
			className={cn(
				'absolute top-full flex flex-col gap-2 rounded-base left-0 w-full h-fit z-[89] p-5 bg-card/80 backdrop-blur-2xl shadow-lg transition-all duration-300 ease-in-out transform-gpu',

				isOpen
					? 'opacity-100 scale-100 translate-y-4'
					: 'opacity-0 scale-95 -translate-y-2 pointer-events-none',
				className
			)}
			role="dialog"
			aria-modal="true"
		>
			{isOpen && children}
		</div>
	);
};

const DropdownBackdrop = ({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}) => {
	if (!isOpen) return null;
	return (
		<div
			className="top-0 left-0 bg-black/10 absolute h-screen w-screen"
			tabIndex={-1}
			onClick={(e) => {
				e.stopPropagation();
				setIsOpen(false);
			}}
		/>
	);
};

export { DropdownBackdrop, Dropdown };
