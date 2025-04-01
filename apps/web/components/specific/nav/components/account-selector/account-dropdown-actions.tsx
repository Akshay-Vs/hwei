import { useClerk } from '@clerk/nextjs';
import { Button } from '@hwei/ui/shadcn/button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@hwei/ui/shadcn/tooltip';
import { LogOut, Settings } from 'lucide-react';
import React, { useState } from 'react';

const AccountDropdownActions = () => {
	const { signOut, session } = useClerk();
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		console.log('Logout clicked, attempting to sign out...');
		setIsLoggingOut(true);

		try {
			await signOut({ sessionId: session?.id, redirectUrl: '' });
			// Force redirect to home page
			if (session) window.location.href = '/';
		} catch (error) {
			console.error('Error during sign out:', error);
			// As a fallback, try to redirect anyway
			window.location.href = '/';
		} finally {
			setIsLoggingOut(false);
		}
	};

	const actions = [
		{
			label: 'Settings',
			icon: <Settings className="w-5 h-5 text-secondary" />,
			onClick: () => {
				console.log('Settings clicked');
			},
		},
		{
			label: 'Logout',
			icon: <LogOut className="w-5 h-5 text-secondary" />,
			onClick: handleLogout,
		},
	];

	return (
		<div className="flex w-fit justify-end">
			{actions.map((action) => (
				<Tooltip key={action.label}>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							className="h-12 w-12 p-0 center hover:bg-secondary/10"
							loading={action.label === 'Logout' && isLoggingOut}
							aria-label={action.label}
							onClick={(e) => {
								action.onClick(e);
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
