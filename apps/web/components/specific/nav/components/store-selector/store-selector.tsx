import { Button } from '@hwei/ui/shadcn/button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@hwei/ui/shadcn/tooltip';
import { ChevronDown } from 'lucide-react';
import React from 'react';

const StoreSelector = () => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button className="w-fit min-w-32 max-w-52 h-16 py-0 px-8 flex items-center justify-center bg-secondary">
					<p className="text-lg font-semibold text-center line-clamp-1">
						My Store
					</p>
					<ChevronDown
						className="text-inherit mt-1"
						aria-label="Switch Stores"
					/>
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p className="text-sm font-semibold">Switch Store</p>
			</TooltipContent>
		</Tooltip>
	);
};

export default StoreSelector;
