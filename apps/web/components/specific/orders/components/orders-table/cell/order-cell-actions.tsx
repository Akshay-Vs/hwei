'use client';
import React, { Fragment, useState, useTransition } from 'react';
import {
	ArrowUpRightSquare,
	Ban,
	Copy,
	Edit,
	EllipsisVertical,
	Printer,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import {
	Dropdown,
	DropdownBackdrop,
} from '@/components/shared/dropdown/dropdown';
import { Button } from '@hwei/ui/shadcn/button';
import { TOrder } from '@/types/order';

interface CellActionProps {
	data: TOrder;
}

const OrderCellActions = ({ data }: CellActionProps) => {
	const [loading, startLoading] = useTransition();
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const params = useParams();

	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
	};

	const onDelete = async (id: string) => {};

	const onPrint = (id: string) => {};

	const toogleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	const actions: {
		label: string;
		icon: React.ReactNode;
		onClick: (data: TOrder) => void;
		variant?: 'default' | 'destructive';
	}[] = [
		{
			label: 'Show details',
			icon: <ArrowUpRightSquare className="w-4 h-4" />,
			onClick: (data: TOrder) => router.push(`/admin/orders/${data.orderId}`),
		},
		{
			label: 'Edit order',
			icon: <Edit className="w-4 h-4" />,
			onClick: (data: TOrder) => router.push(`/admin/orders/${data.orderId}`),
		},
		{
			label: 'Print Invoice',
			icon: <Printer className="w-4 h-4" />,
			onClick: (data: TOrder) => onPrint(data.orderId),
		},

		{
			label: 'Copy order id',
			icon: <Copy className="w-4 h-4" />,
			onClick: (data: TOrder) => onCopy(data.orderId),
		},
		{
			label: 'Cancel order',
			icon: <Ban className="w-4 h-4" />,
			onClick: (data: TOrder) => onDelete(data.orderId),
			variant: 'destructive',
		},
	];

	return (
		<Fragment>
			<div className="w-full center relative">
				<Button
					variant="ghost"
					size="icon"
					className="py-2 w-12 hover:bg-secondary/5"
					aria-label="Open order actions"
					tooltip="Order actions"
					onClick={toogleDropdown}
				>
					<EllipsisVertical className="w-5 h-5 text-secondary" />
				</Button>

				<Dropdown
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					labelledBy="order-actions"
					describedBy="order-actions-desc order-actions-ins"
					className="w-fit -translate-x-1/2 rounded-[30px] p-3"
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
			<DropdownBackdrop
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				className="bg-transparent"
			/>
		</Fragment>
	);
};

export default OrderCellActions;
