import React from 'react';
import { Button } from '@hwei/ui/shadcn/button';
import { cn } from '@hwei/ui/utils/cn';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@hwei/ui/shadcn/tooltip';

interface IconButtonProps {
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	icon: React.ReactNode;
	loading?: boolean;
	disabled?: boolean;
	className?: string;
	label: string;
}

const IconButton = ({
	onClick,
	icon,
	loading,
	disabled,
	label,
	className,
}: IconButtonProps) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					onClick={onClick}
					disabled={disabled || loading}
					aria-label={label}
					className={cn(
						'h-16 w-16 bg-transparent shadow-none border-secondary/60 border-2 hover:bg-secondary text-secondary/60 hover:text-highlight',
						className
					)}
				>
					{icon}
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p className="text-sm font-semibold">{label}</p>
			</TooltipContent>
		</Tooltip>
	);
};

export default IconButton;
