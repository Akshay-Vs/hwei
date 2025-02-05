'use client';
import React, { Fragment, useState, useTransition } from 'react';
import {
	ArrowUpRightSquare,
	Copy,
	Trash2,
	Edit,
	EllipsisVertical,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@hwei/ui/shadcn/button';

import SrOnly from '@/components/shared/aria/sr-only';
import { TProduct } from '@/types/product-type';
import {
	Dropdown,
	DropdownBackdrop,
} from '@/components/shared/dropdown/dropdown';
import { useToast } from '@/hooks/use-toast';

interface CellActionProps {
	data: TProduct;
}

const ProductActionsCell = ({ data }: CellActionProps) => {
	const [loading, startLoading] = useTransition();
	const [isOpen, setIsOpen] = useState(false);

	const router = useRouter();
	const { toast } = useToast();

	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		setIsOpen(false);
		toast({
			title: 'Copied to clipboard',
			description: 'Product id has been copied to clipboard',
		});
	};

	const onDelete = (id: string) => {};

	const toogleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	const actions: {
		label: string;
		icon: React.ReactNode;
		onClick: (data: TProduct) => void;
		variant?: 'default' | 'destructive';
	}[] = [
		{
			label: 'Show product',
			icon: <ArrowUpRightSquare className="w-4 h-4" />,
			onClick: (data: TProduct) => router.push(`/admin/product/${data.id}`),
		},
		{
			label: 'Edit product',
			icon: <Edit className="w-4 h-4" />,
			onClick: (data: TProduct) => router.push(`/admin/product/${data.id}`),
		},
		{
			label: 'Copy product id',
			icon: <Copy className="w-4 h-4" />,
			onClick: (data: TProduct) => onCopy(data.id),
		},
		{
			label: 'delete product',
			icon: <Trash2 className="w-4 h-4" />,
			onClick: (data: TProduct) => onDelete(data.id),
			variant: 'destructive',
		},
	];

	return (
		<Fragment>
			<div className="w-full center relative">
				<Button
					id="product-actions"
					variant="ghost"
					size="icon"
					className="py-2 w-12 hover:bg-secondary/5"
					aria-label="Open product actions"
					tooltip="Product actions"
					onClick={toogleDropdown}
				>
					<EllipsisVertical className="w-5 h-5 text-secondary" />
				</Button>

				<Dropdown
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					labelledBy="product-actions"
					describedBy="product-actions-desc"
					className="w-fit  rounded-[30px] p-3"
				>
					<h4 className="text-lg font-semibold">Actions</h4>
					{actions.map((action) => (
						<Button
							variant={action.variant || 'ghost'}
							className={`flex w-full justify-start items-center gap-4 ${action.variant !== 'destructive' && 'hover:bg-secondary/5'}`}
							onClick={() => action.onClick(data)}
							key={action.label}
						>
							{action.icon}
							<p className="text-base">{action.label}</p>
						</Button>
					))}
				</Dropdown>
			</div>

			<SrOnly id="product-actions-desc">
				This menu provides actions for managing the this product
			</SrOnly>

			<DropdownBackdrop
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				className="bg-transparent"
			/>
		</Fragment>
	);
};

export default ProductActionsCell;
