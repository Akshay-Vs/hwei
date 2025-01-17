import { Dropdown } from '@/components/shared/dropdown/dropdown';
import { Button } from '@hwei/ui/shadcn/button';
import { Separator } from '@hwei/ui/shadcn/separator';
import { Armchair, PlusCircle, Shirt, Store } from 'lucide-react';
import React from 'react';

const StoreSelectorDropdown = ({ isOpen }: { isOpen: boolean }) => {
	const stores = [
		{
			name: 'Clothing Store',
			id: 'store-1',
			icon: <Shirt />,
		},
		{
			name: 'Furniture Store',
			id: 'store-2',
			icon: <Armchair />,
		},
		{
			name: 'Perfume Store',
			id: 'store-3',
			icon: <Store />,
		},
	];

	return (
		<Dropdown isOpen={isOpen} className="w-fit -translate-x-1/2 left-1/2 gap-4">
			<div className="center flex-col gap-2">
				{stores.map((store) => (
					<Button
						key={store.id}
						variant="ghost"
						className="flex items-center gap-4 hover:bg-secondary/10 py-6"
					>
						<div className="w-5 h-5">{store.icon}</div>
						<p className="text-lg font-medium">{store.name}</p>
					</Button>
				))}
			</div>

			<Separator className="opacity-30" />
			<Button
				variant="secondary"
				className="flex items-center gap-4 py-6 w-full"
			>
				<PlusCircle className="w-5 h-5 text-white" />
				<p className="text-lg font-medium text-white">Add Store</p>
			</Button>
		</Dropdown>
	);
};

export default StoreSelectorDropdown;
