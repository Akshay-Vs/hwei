import React, { Fragment } from 'react';
import { Card, CardHeader } from '@hwei/ui/shadcn/card';
import { cn } from '@hwei/ui/utils/cn';

import { BaseProps } from '@/types/base-props';

const EditorCard = ({
	title,
	children,
	className,
}: { title: string } & BaseProps) => {
	return (
		<Fragment>
			<Card
				className={cn(
					'h-fit w-full gap-4 bg-highlight/20 focus-within:bg-highlight/70 transition-colors duration-300',
					className
				)}
			>
				<CardHeader className="p-0 gap-2 w-full">
					<h1 className="text-xl font-medium inline-flex items-center">
						{title}
					</h1>
				</CardHeader>
				{children}
			</Card>
		</Fragment>
	);
};

export default EditorCard;
