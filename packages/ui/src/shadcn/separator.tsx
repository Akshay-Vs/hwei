import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { cn } from '@/src/utils/cn';

interface SeparatorProps
	extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
	className?: string;
}

const Separator = React.forwardRef<
	React.ComponentRef<typeof SeparatorPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
	(
		{
			className,
			orientation = 'horizontal',
			decorative = true,
			...props
		}: SeparatorProps,
		ref
	) => (
		<SeparatorPrimitive.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={cn(
				'shrink-0 bg-[#919091]',
				orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
				className
			)}
			{...props}
		/>
	)
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
