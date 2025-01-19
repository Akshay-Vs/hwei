import Image from 'next/image';
import React from 'react';

import { Dropdown } from '@/components/shared/dropdown/dropdown';
import { Separator } from '@hwei/ui/shadcn/separator';

import AccountDropdownActions from './account-dropdown-actions';
import AddNewAccount from './add-new-account';
import { DropdownProps } from '@/types/dropdown-props';

const AccountDropdownContent = ({ isOpen, onClose }: DropdownProps) => {
	const users = [
		{
			id: 'LAGS087OUYAGs',
			name: 'Evelin Violet',
			email: 'evelin@gmail.com',
			image:
				'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
			isSelected: true,
		},
		{
			id: 'ASASd87987987',
			name: 'Vector Eco',
			email: 'vector@gmail.com',
			image:
				'https://23ujkrayxy.ufs.sh/f/u628d5y0J6C1Fzz7UKUwCKLh4vqwZaVBckdHsNE2bJnG9SOz',
		},
	];

	return (
		<Dropdown
			isOpen={isOpen}
			onClose={onClose}
			labelledBy="account-selector"
			describedBy="account-selector-desc account-selector-ins"
			className="w-96 gap-4"
		>
			{users.map((user) => (
				<div
					className={`w-full flex items-center gap-4 p-4 rounded-base cursor-pointer transition-all duration-300 ${user.isSelected ? 'bg-accent/10 hover:bg-accent/20' : 'hover:bg-accent/5'}`}
					key={user.id}
				>
					<Image
						src={user.image}
						width={50}
						height={50}
						alt={`${user.name}'s profile picture`}
						className="w-12 h-12 rounded-full object-center object-cover"
					/>
					<div className="flex flex-col">
						<p className="text-base font-semibold text-secondary">
							{user.name}
						</p>
						<p className="text-sm font-normal text-secondary">{user.email}</p>
					</div>

					{user.isSelected === true ? <AccountDropdownActions /> : null}
				</div>
			))}

			<Separator className="opacity-30" />
			<AddNewAccount />
		</Dropdown>
	);
};

export default AccountDropdownContent;
