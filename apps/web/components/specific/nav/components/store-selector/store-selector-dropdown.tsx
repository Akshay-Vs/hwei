import { Dropdown } from '@/components/shared/dropdown/dropdown';
import { useStoreModal } from '@/stores/modal-store/store-modal-store';
import { useSelectedStore } from '@/stores/stores-store';
import { DropdownProps } from '@/types/dropdown-props';
import { TStore } from '@/types/store-type';
import { IconRenderer } from '@/utils/lucide/icon-renderer';
import { Button } from '@hwei/ui/shadcn/button';
import { Separator } from '@hwei/ui/shadcn/separator';
import { cn } from '@hwei/ui/utils/cn';
import { PlusCircle } from 'lucide-react';
import React, { useEffect } from 'react';

const StoreSelectorDropdown = ({ isOpen, onClose }: DropdownProps) => {
	const stores: TStore[] = [
		{
			name: 'Clothing Store',
			id: 'store-1',
			icon: 'Shirt',
		},
		{
			name: 'Furniture Store',
			id: 'store-2',
			icon: 'Armchair',
		},
		{
			name: 'Perfume Store',
			id: 'store-3',
			icon: 'SprayCan',
		},
	];

	const { onOpen: onStoreModalOpen } = useStoreModal();
	const { selectedStore, setSelectedStore } = useSelectedStore();

	const selectStore = (store: TStore) => {
		setSelectedStore(store);
		onClose();
	};

	useEffect(() => {
		if (stores.length > 0 && !selectedStore)
			setSelectedStore(stores[0] as TStore);
	}, [stores, selectedStore, setSelectedStore]);

	return (
		<Dropdown
			isOpen={isOpen}
			onClose={onClose}
			labelledBy="store-selector"
			describedBy="store-selector-desc"
			className="w-fit -translate-x-1/2 left-1/2 gap-4"
		>
			<div className="center flex-col gap-2">
				{stores.map((store) => {
					const IconComponent = IconRenderer({ icon: store.icon });
					return (
						<Button
							key={store.id}
							variant="ghost"
							className={cn(
								'flex items-center gap-4 hover:bg-secondary/5 py-6',
								selectedStore?.id === store.id
									? 'bg-accent/30 hover:bg-accent/20'
									: 'hover:bg-accent/10'
							)}
							onClick={() => selectStore(store)}
						>
							<IconComponent className="h-5 w-5" />
							<p className="text-lg font-medium">{store.name}</p>
						</Button>
					);
				})}
			</div>

			<Separator className="opacity-30" />
			<Button
				variant="secondary"
				className="flex items-center gap-4 py-6 w-full"
				onClick={() => {
					onStoreModalOpen();
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
