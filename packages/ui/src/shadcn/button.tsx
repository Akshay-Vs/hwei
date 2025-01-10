import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/src/utils/cn';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-base font-medium transition-colors focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:border-accent/20 focus-visible:outline-dotted focus-visible:outline-secondary',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline:
					'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost:
					'hover:bg-accent hover:text-accent-foreground !outline-none focus:border-none !focus:outline-none',
				link: 'text-primary underline-offset-4 hover:underline',
				tag: 'rounded-[30px] bg-transparent text-black border-[#909090] border-2 shadow-none font-medium',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 px-3',
				lg: 'h-10 px-8',
				icon: 'h-9 w-9',
				fill: 'h-full w-full',
				fit: 'h-fit w-fit',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, children, loading, ...props }, ref) => {
		// const Comp = asChild ? Slot : 'button';
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				disabled={loading}
				{...props}
			>
				{loading ? (
					<LoaderCircle className="text-inherit animate-spin" />
				) : (
					children
				)}
			</button>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
