'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import { ChevronDown } from 'lucide-react';
import IconButton from '@/components/shared/button/icon-button';

import AccountDropdownContent from './account-dropdown-content';
import { DropdownBackdrop } from '@/components/shared/dropdown/dropdown';

const AccountSelector = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<DropdownBackdrop isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className="relative h-fit w-fit z-50" onClick={toggleDropdown}>
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

					<IconButton
						icon={<ChevronDown className="text-inherit" />}
						label="Switch Account"
						onClick={(e) => {
							e.stopPropagation();
							toggleDropdown();
						}}
					/>
				</div>
				<AccountDropdownContent isOpen={isOpen} />
			</div>
		</>
	);
};

export default AccountSelector;
