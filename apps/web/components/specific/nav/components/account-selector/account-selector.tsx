'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import { ChevronDown } from 'lucide-react';
import IconButton from '@/components/shared/button/icon-button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@hwei/ui/shadcn/tooltip';

import AccountDropdownContent from './account-dropdown-content';

const AccountSelector = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className="relative h-fit w-fit z-50">
			<div className="border-2 border-highlight h-fit w-72 p-1 rounded-base flex justify-between items-center cursor-pointer">
				<Image
					src="https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0"
					width={86}
					height={86}
					alt="Profile"
					className="w-16 h-16 rounded-full object-center object-cover"
				/>

				<div>
					<p className="text-sm font-normal">Welcome</p>
					<p className="text-lg font-medium">Evelin Violet</p>
				</div>

				<Tooltip>
					<TooltipTrigger asChild>
						<IconButton
							icon={<ChevronDown className="text-inherit" />}
							ariaLabel="My Account"
							onClick={toggleDropdown}
						/>
					</TooltipTrigger>
					<TooltipContent>
						<p className="text-sm font-semibold">My Account</p>
					</TooltipContent>
				</Tooltip>
			</div>
			<AccountDropdownContent isOpen={isOpen} />
		</div>
	);
};

export default AccountSelector;
