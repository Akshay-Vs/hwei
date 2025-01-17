import Dropdown from '@/components/shared/dropdown/dropdown';
import { Button } from '@hwei/ui/shadcn/button';
import { Separator } from '@hwei/ui/shadcn/separator';
import Image from 'next/image';
import React from 'react';

const AccountDropdownContent = ({ isOpen }: { isOpen: boolean }) => {
	const actions = [
		{
			label: 'My Profile',
			action: () => {},
		},
		{
			label: 'Add Account',
			action: () => {},
		},
		{
			label: 'Switch Account',
			action: () => {},
		},
		{
			label: 'Log Out',
			action: () => {},
		},
	];

	return (
		<Dropdown isOpen={isOpen}>
			<div className="full center flex-col gap-1 text-center">
				<Image
					src="https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0"
					width={100}
					height={100}
					alt="Profile"
					className="w-20 h-20 rounded-full object-center object-cover"
				/>
				<p className="text-xl font-medium">Evelin Violet</p>
				<p className="text-base font-normal text-secondary">evelin@gmail.com</p>
			</div>
			<Separator className="opacity-30" />

			<div className="grid grid-cols-2 gap-2 mt-2">
				{actions.map((action) => (
					<Button
						variant="outline"
						className="h-12 w-full bg-background flex-1 hover:bg-secondary/10 border border-black/20"
						key={action.label}
						onClick={action.action}
						aria-label={action.label}
						tabIndex={isOpen ? 0 : -1}
					>
						<p className="text-sm font-semibold text-black">{action.label}</p>
					</Button>
				))}
			</div>
		</Dropdown>
	);
};

export default AccountDropdownContent;
