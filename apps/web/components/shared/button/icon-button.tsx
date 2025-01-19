import React from 'react';
import { Button } from '@hwei/ui/shadcn/button';
import { cn } from '@hwei/ui/utils/cn';

interface IconButtonProps {
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	icon: React.ReactNode;
	loading?: boolean;
	disabled?: boolean;
	className?: string;
	label: string;
	id?: string;
}

const IconButton = ({
	id,
	onClick,
	icon,
	loading,
	disabled,
	label,
	className,
}: IconButtonProps) => {
	return (
		<Button
			id={id}
			onClick={onClick}
			disabled={disabled || loading}
			aria-label={label}
			tooltip={label}
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
