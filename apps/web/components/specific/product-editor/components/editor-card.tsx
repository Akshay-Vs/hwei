import React, { ReactNode } from 'react';
import { Card, CardHeader } from '@hwei/ui/shadcn/card';
import { cn } from '@hwei/ui/utils/cn';

import { BaseProps } from '@/types/base-props';

const EditorCard = ({
	title,
	children,
	className,
	header,
}: { title: string; header?: ReactNode } & BaseProps) => {
	return (
		<Card
			className={cn(
				'h-fit w-full gap-4 bg-highlight/20 focus-within:bg-highlight/70 active:bg-highlight/70 hover:bg-highlight/50 transition-colors duration-300',
				className
			)}
		>
			<CardHeader className="p-0 gap-2 w-full flex flex-row items-start justify-between">
				<h2 className="text-xl font-medium inline-flex items-center">
					{title}
				</h2>

				{header}
			</CardHeader>
			{children}
		</Card>
	);
};

export default EditorCard;
