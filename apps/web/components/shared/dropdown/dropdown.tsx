import React, { Fragment, PropsWithChildren, useEffect, useRef } from 'react';
import { cn } from '@hwei/ui/utils/cn';
import SrOnly from '../aria/sr-only';

interface DropdownProps extends PropsWithChildren {
	isOpen: boolean;
	className?: string;
	onClose?: () => void;
	labelledBy: string;
	describedBy?: string;
}

const Dropdown = ({
	isOpen,
	children,
	className,
	onClose,
	labelledBy,
	describedBy,
}: DropdownProps) => {
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Focus management
	useEffect(() => {
		if (isOpen) {
			// Find the first focusable element
			const focusableElements = dropdownRef.current?.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			if (focusableElements?.length) {
				(focusableElements[0] as HTMLElement).focus();
			}
		}
	}, [isOpen]);

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape' && onClose) {
			onClose();
		}
	};

	return (
		<Fragment>
			<div
				ref={dropdownRef}
				className={cn(
					'absolute top-full flex flex-col gap-2 rounded-[3.125rem] left-0 w-full h-fit z-50 p-6 bg-card backdrop-brightness-90 backdrop-blur-2xl shadow-lg transition-all duration-300 ease-in-out transform-gpu',
					isOpen
						? 'opacity-100 scale-100 translate-y-4'
						: 'opacity-0 scale-95 -translate-y-2 pointer-events-none',
					className
				)}
				onBlur={(e) => {
					// Close the dropdown on focus out
					if (
						e.relatedTarget &&
						!dropdownRef.current?.contains(e.relatedTarget as Node)
					) {
						onClose?.();
					}
				}}
				role="dialog"
				aria-modal="true"
				aria-labelledby={labelledBy}
				aria-describedby={'dropdown-ins '.concat(describedBy || '')}
				aria-hidden={!isOpen}
				onKeyDown={handleKeyDown}
			>
				{isOpen && children}
			</div>

			<SrOnly id="dropdown-ins">
				Use the Escape key or focus outside to close the dropdown menu. Navigate
				through the menu using the Tab key and Shift+Tab for reverse navigation.
			</SrOnly>
		</Fragment>
	);
};

interface DropdownBackdropProps {
	isOpen: boolean;
	className?: string;
	setIsOpen: (isOpen: boolean) => void;
}

const DropdownBackdrop = ({
	isOpen,
	setIsOpen,
	className,
}: DropdownBackdropProps) => {
	if (!isOpen) return null;

	return (
		<div
			className={cn(
				'fixed top-0 left-0 bg-black/10 h-screen w-screen z-10',
				className
			)}
			role="presentation"
			aria-hidden="true"
			tabIndex={-1}
			onClick={(e) => {
				e.stopPropagation();
				setIsOpen(false);
			}}
		/>
	);
};

export { DropdownBackdrop, Dropdown };
