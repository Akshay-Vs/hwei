import { Button } from '@hwei/ui/shadcn/button';
import { ChevronDown } from 'lucide-react';
import React from 'react';

const StoreSelector = () => {
	return (
		<div>
			<Button className="w-fit min-w-32 max-w-52 h-16 py-0 px-8 flex items-center justify-center bg-secondary">
				<p className="text-lg font-semibold text-center line-clamp-1">
					My Store
				</p>
				<ChevronDown className="text-inherit scale-150 mt-1" />
			</Button>
		</div>
	);
};

export default StoreSelector;
