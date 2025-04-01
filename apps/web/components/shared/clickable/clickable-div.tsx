import { cn } from '@hwei/ui/utils/cn';
import React, { forwardRef, KeyboardEvent } from 'react';

interface ClickableDivProps extends React.HTMLAttributes<HTMLDivElement> {
	disabled?: boolean;
	ariaLabel?: string;
	ariaPressed?: boolean;
	ariaExpanded?: boolean;
	ariaControls?: string;
	ariaDescribedby?: string;
	loading?: boolean;
}

const ClickableDiv = forwardRef<HTMLDivElement, ClickableDivProps>(
	(
		{
			children,
			onClick,
			disabled = false,
			role = 'button',
			tabIndex = 0,
			ariaLabel,
			ariaPressed,
			ariaExpanded,
			ariaControls,
			ariaDescribedby,
			onKeyDown,
			className,
			loading,
			...rest
		},
		ref
	) => {
		const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
			// Handle keyboard navigation - Space and Enter should trigger click
			if (
				(event.key === 'Enter' || event.key === ' ') &&
				onClick &&
				!disabled
			) {
				event.preventDefault();
				onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
			}

			// Call the original onKeyDown handler if provided
			onKeyDown?.(event);
		};

		return (
			<div
				ref={ref}
				role={role}
				tabIndex={disabled ? -1 : tabIndex}
				onClick={disabled ? undefined : onClick}
				onKeyDown={handleKeyDown}
				aria-disabled={disabled}
				aria-label={ariaLabel}
				aria-pressed={ariaPressed}
				aria-expanded={ariaExpanded}
				aria-controls={ariaControls}
				aria-describedby={ariaDescribedby}
				style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
				className={cn(
					'disabled:cursor-not-allowed cursor-pointer focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:border-accent/20 focus-visible:outline-dotted focus-visible:outline-secondary duration-300',
					loading &&
						'bg-gradient-accent from-accent/5 via-accent/10 to-accent/20 animate-gradient-x ',
					className
				)}
				{...rest}
			>
				{children}
			</div>
		);
	}
);

ClickableDiv.displayName = 'ClickableDiv';

export default ClickableDiv;
