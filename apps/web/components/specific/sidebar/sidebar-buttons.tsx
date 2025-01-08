'use client';
import { Button } from '@hwei/ui/shadcn/button';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@hwei/ui/shadcn/tooltip';
import { cn } from '@hwei/ui/utils/cn';
import {
	DollarSign,
	LayoutGrid,
	Package,
	ShoppingCart,
	Truck,
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
		label: 'Shipping',
		icon: <Truck className="w-8 h-8 " strokeWidth={1.5} />,
		href: '/shipping',
	},
	{
		label: 'Earnings',
		icon: <DollarSign className="w-8 h-8" strokeWidth={1.5} />,
		href: '/earnings',
	},
];

const SidebarButtons = () => {
	const path = usePathname();
	return (
		<div className="flex flex-col gap-12">
			{sidebarButtons.map((button) => (
				<Tooltip key={button.label}>
					<TooltipTrigger key={button.label} asChild>
						<Link
							href={button.href}
							className="focus:outline-dotted focus:outline-accent focus:border-secondary center border-2 border-transparent"
						>
							<Button
								className="hover:bg-transparent"
								variant="ghost"
								size="icon"
								aria-label={button.label}
								tabIndex={-1}
							>
								<div
									className={cn(
										'rounded-full p-4',
										path === button.href
											? 'text-accent bg-secondary'
											: 'text-secondary hover:bg-accent/10 hover:text-secondary/80 focus:bg-accent/10 focus:text-secondary/80 transition-all duration-300'
									)}
								>
									{button.icon}
								</div>
							</Button>
						</Link>
					</TooltipTrigger>

					<TooltipContent>
						<p className="text-sm font-semibold">{button.label}</p>
					</TooltipContent>
				</Tooltip>
			))}
		</div>
	);
};

export default SidebarButtons;
