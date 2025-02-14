import { BaseProps } from '@/types/base-props';
import { Card, CardHeader } from '@hwei/ui/shadcn/card';
import { cn } from '@hwei/ui/utils/cn';
import React, { useRef } from 'react';

interface ModalProps extends BaseProps {
	title: string;
	description: string;
	isOpen: boolean;
	onClose?: () => void;
}

const Modal = ({
	className,
	children,
	isOpen,
	onClose,
	title,
	description,
}: ModalProps) => {
	if (!isOpen) return null;

	return (
		<div
			className="fixed top-0 left-0 bg-black/30 h-screen w-screen center cursor-pointer backdrop-blur-sm"
			onClick={onClose}
		>
			<Card
				className={cn('h-fit w-fit min-w-[32rem] px-8 py-6', className)}
				onClick={(e) => e.stopPropagation()}
			>
				<CardHeader className="pb-4">
					<h1 className="text-2xl">{title}</h1>
					<p className="text-sm">{description}</p>
				</CardHeader>
				{children}
			</Card>
		</div>
	);
};

export default Modal;
