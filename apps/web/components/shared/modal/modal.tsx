import { BaseProps } from '@/types/base-props';
import { Card, CardHeader } from '@hwei/ui/shadcn/card';
import { cn } from '@hwei/ui/utils/cn';
import React, { useEffect, useRef } from 'react';

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
	const modalRef = useRef<HTMLDivElement>(null);

	// Focus management
	const findFocusableElements = () => {
		if (isOpen) {
			// Find the first focusable element
			const focusableElements = modalRef.current?.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			if (focusableElements?.length) {
				(focusableElements[0] as HTMLElement).focus();
			}
		}
	};

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape' && onClose) {
			onClose();
		}
	};

	// Handle focus out
	const handleBlur = (e: React.FocusEvent) => {
		// Close the modal on focus out
		if (
			e.relatedTarget &&
			!modalRef.current?.contains(e.relatedTarget as Node)
		) {
			// refocus on the modal
			findFocusableElements();
		}
	};

	// Focus management
	useEffect(() => {
		findFocusableElements();
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div
			ref={modalRef}
			role="presentation"
			className="fixed top-0 left-0 bg-black/30 h-screen w-screen center cursor-pointer backdrop-blur-sm"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose?.();
			}}
			onKeyDown={handleKeyDown}
			onBlur={handleBlur}
		>
			<Card
				className={cn(
					'h-fit w-fit min-w-[32rem] px-8 py-6 backdrop-brightness-150 cursor-default z-[999]',
					className
				)}
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
