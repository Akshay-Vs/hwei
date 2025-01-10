import { Button } from '@hwei/ui/shadcn/button';
import { cn } from '@hwei/ui/utils/cn';
import React from 'react';

interface IconButtonProps {
	onClick?: () => void;
	icon: React.ReactNode;
	loading?: boolean;
	disabled?: boolean;
	className?: string;
	ariaLabel: string;
}

const IconButton = ({
	onClick,
	icon,
	loading,
	disabled,
	ariaLabel,
	className,
}: IconButtonProps) => {
	return (
		<Button
			onClick={onClick}
			disabled={disabled || loading}
			aria-label={ariaLabel}
			className={cn(
				'h-16 w-16 bg-transparent shadow-none border-secondary/60 border-2 hover:bg-secondary text-secondary/60 hover:text-highlight',
				className
			)}
		>
			{icon}
		</Button>
	);
};

export default IconButton;
