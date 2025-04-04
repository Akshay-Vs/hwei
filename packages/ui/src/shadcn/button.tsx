import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/src/utils/cn';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-base font-medium transition-colors focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:border-accent/20 focus-visible:outline-dotted focus-visible:outline-secondary duration-300',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline:
					'border border-input bg-background shadow-sm hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost:
					'hover:bg-none hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-accent/50',
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
	tooltip?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, children, loading, tooltip, ...props }, ref) => {
		// const Comp = asChild ? Slot : 'button';
		return (
			<Tooltip>
				<TooltipTrigger asChild>
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
				</TooltipTrigger>

				{tooltip && (
					<TooltipContent>
						<p className="text-sm font-semibold">{tooltip}</p>
					</TooltipContent>
				)}
			</Tooltip>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
