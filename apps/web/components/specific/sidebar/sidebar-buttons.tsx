'use client';
import { Button } from '@hwei/ui/shadcn/button';

import { cn } from '@hwei/ui/utils/cn';
import {
	DollarSign,
	LayoutGrid,
	Package,
	ShoppingCart,
	User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const sidebarButtons = [
	{
		label: 'Dashboard',
		icon: <LayoutGrid className="w-8 h-8 " strokeWidth={1.5} />,
		href: '/',
	},
	{
		label: 'Products',
		icon: <Package className="w-8 h-8 " strokeWidth={1.5} />,
		href: '/products',
	},
	{
		label: 'Orders',
		icon: <ShoppingCart className="w-8 h-8 " strokeWidth={1.5} />,
		href: '/orders',
	},
	{
		label: 'Users',
		icon: <User className="w-8 h-8 " strokeWidth={1.5} />,
		href: '/users',
	},
	{
		label: 'Revenue',
		icon: <DollarSign className="w-8 h-8" strokeWidth={1.5} />,
		href: '/revenue',
	},
];

const SidebarButtons = () => {
	const path = usePathname();

	const isActive = (href: string) => {
		return path.split('/')[1] === href.split('/')[1];
	};

	return (
		<div className="flex flex-col gap-12 full">
			{sidebarButtons.map((button) => (
				<Link
					key={button.label}
					href={button.href}
					className="focus:outline-dotted focus:outline-accent focus:border-secondary center border-2 border-transparent active:outline-accent"
				>
					<Button
						className="hover:bg-transparent"
						variant="ghost"
						size="icon"
						aria-label={button.label}
						aria-current={isActive(button.href) ? 'page' : undefined}
						aria-controls="sidebar-menu"
						tooltip={button.label}
						tabIndex={-1}
					>
						<div
							className={cn(
								'rounded-full p-4 transition-all duration-300',
								isActive(button.href)
									? 'text-accent bg-secondary'
									: 'text-secondary hover:bg-accent/20 hover:text-secondary/80'
							)}
						>
							{button.icon}
						</div>
					</Button>
				</Link>
			))}
		</div>
	);
};

export default SidebarButtons;
