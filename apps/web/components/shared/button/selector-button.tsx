import { Button } from '@hwei/ui/shadcn/button';
import { cn } from '@hwei/ui/utils/cn';
import { LoaderCircle } from 'lucide-react';
import React, { PropsWithChildren } from 'react';

interface SelectorButtonProps extends PropsWithChildren {
	onClick?: () => void;
	loading?: boolean;
	disabled?: boolean;
	className?: string;
	ariaLabel?: string;
	selected?: boolean;
}

const SelectorButton = ({
	onClick,
	loading,
	selected,
	disabled,
	ariaLabel,
	className,
	children,
}: SelectorButtonProps) => {
	return (
		<Button
			onClick={onClick}
			disabled={disabled || loading}
			aria-label={ariaLabel}
			aria-busy={loading}
			aria-current={selected}
			className={cn(
				'h-12 min-w-16 px-6 shadow-none text-base font-medium transition-all duration-300',
				selected
					? 'border-accent/60 border-2 bg-accent/40 hover:bg-accent/60 text-secondary'
					: 'border-secondary/60 border-2 bg-accent/5 hover:bg-secondary/90 focus-visible:bg-secondary/90 text-secondary focus-visible:text-white hover:text-white',
				className
			)}
		>
			{loading ? (
				<LoaderCircle className="text-inherit scale-150 animate-spin" />
			) : (
				<>{children}</>
			)}
		</Button>
	);
};

export default SelectorButton;
