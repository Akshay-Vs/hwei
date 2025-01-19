'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

import IconButton from '@/components/shared/button/icon-button';
import AccountSelectorUser from './account-selector-user';
import AccountDropdownContent from './account-dropdown-content';
import SrOnly from '@/components/shared/aria/sr-only';
import { DropdownBackdrop } from '@/components/shared/dropdown/dropdown';

const AccountSelector = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<DropdownBackdrop isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className="relative h-fit w-fit z-50">
				<div className="border-2 border-highlight h-fit w-72 p-1 rounded-base flex justify-between items-center cursor-pointer">
					<AccountSelectorUser />

					<IconButton
						id="account-selector"
						icon={<ChevronDown className="text-inherit" />}
						label="Switch Account"
						onClick={(e) => {
							e.stopPropagation();
							toggleDropdown();
						}}
					/>

					<SrOnly id="account-selector-desc">
						This dropdown lists all accounts you are currently logged into,
						along with actions available for the active account.
					</SrOnly>
				</div>
				<AccountDropdownContent
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
				/>
			</div>
		</>
	);
};

export default AccountSelector;
