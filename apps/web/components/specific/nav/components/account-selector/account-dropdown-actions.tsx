import { Button } from '@hwei/ui/shadcn/button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@hwei/ui/shadcn/tooltip';
import { LogOut, Settings } from 'lucide-react';
import React from 'react';

const AccountDropdownActions = () => {
	const actions = [
		{
			label: 'Settings',
			icon: <Settings className="w-5 h-5 text-secondary" />,
		},
		{
			label: 'Logout',
			icon: <LogOut className="w-5 h-5 text-secondary" />,
		},
	];
	return (
		<div className="flex w-full justify-end px-4">
			{actions.map((action) => (
				<Tooltip key={action.label}>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							className="h-12 w-12 p-0 center hover:bg-secondary/10"
							aria-label={action.label}
							onClick={(e) => {
								e.stopPropagation();
								console.log('clicked');
							}}
						>
							{action.icon}
						</Button>
					</TooltipTrigger>

					<TooltipContent>
						<p className="text-sm text-white font-semibold">{action.label}</p>
					</TooltipContent>
				</Tooltip>
			))}
		</div>
	);
};

export default AccountDropdownActions;
