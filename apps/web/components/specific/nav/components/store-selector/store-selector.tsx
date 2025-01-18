'use client';
import { Button } from '@hwei/ui/shadcn/button';

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
				<Button
					className="w-fit min-w-32 max-w-52 h-16 py-0 px-8 flex items-center justify-center bg-secondary"
					tooltip="Switch Store"
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

				<StoreSelectorDropdown isOpen={isOpen} />
			</div>
		</>
	);
};

export default StoreSelector;
