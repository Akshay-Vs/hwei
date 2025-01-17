'use client';
import { Button } from '@hwei/ui/shadcn/button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@hwei/ui/shadcn/tooltip';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import StoreSelectorDropdown from './store-selector-dropdown';
import { DropdownBackdrop } from '@/components/shared/dropdown/dropdown';

const StoreSelector = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<DropdownBackdrop isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className="relative h-fit w-fit z-50">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							className="w-fit min-w-32 max-w-52 h-16 py-0 px-8 flex items-center justify-center bg-secondary"
							onClick={toggleDropdown}
						>
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

					<StoreSelectorDropdown isOpen={isOpen} />
				</Tooltip>
			</div>
		</>
	);
};

export default StoreSelector;
