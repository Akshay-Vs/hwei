import { Dropdown } from '@/components/shared/dropdown/dropdown';
import { useStoreModal } from '@/stores/store-modal-store';
import { DropdownProps } from '@/types/dropdown-props';
import { Button } from '@hwei/ui/shadcn/button';
import { Separator } from '@hwei/ui/shadcn/separator';
import { Armchair, PlusCircle, Shirt, Store } from 'lucide-react';
import React from 'react';

const StoreSelectorDropdown = ({ isOpen, onClose }: DropdownProps) => {
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

	const { onOpen } = useStoreModal();
	return (
		<Dropdown
			isOpen={isOpen}
			onClose={onClose}
			labelledBy="store-selector"
			describedBy="store-selector-desc"
			className="w-fit -translate-x-1/2 left-1/2 gap-4"
		>
			<div className="center flex-col gap-2">
				{stores.map((store) => (
					<Button
						key={store.id}
						variant="ghost"
						className="flex items-center gap-4 hover:bg-secondary/5 py-6"
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
				onClick={() => {
					onOpen();
					onClose();
				}}
			>
				<PlusCircle className="w-5 h-5 text-white" />
				<p className="text-lg font-medium text-white">Add Store</p>
			</Button>
		</Dropdown>
	);
};

export default StoreSelectorDropdown;
