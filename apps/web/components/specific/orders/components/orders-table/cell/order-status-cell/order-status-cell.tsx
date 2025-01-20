import { DropdownBackdrop } from '@/components/shared/dropdown/dropdown';
import { TOrder, TOrderStatus } from '@/types/order-type';
import { Button } from '@hwei/ui/shadcn/button';
import { Row } from '@tanstack/react-table';
import React, { Fragment, useState } from 'react';
import OrderStatusCellDropdown from './order-status-cell-dropdown';
import { STATUS_STYLES } from './constants';

interface OrderStatusCellProps {
	row: Row<TOrder>;
}

const OrderStatusCell: React.FC<OrderStatusCellProps> = ({ row }) => {
	const status = row.getValue('status') as TOrderStatus;
	const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.processing;

	const [isOpen, setIsOpen] = useState(false);
	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<Fragment>
			<div className="w-full center relative">
				<Button
					id="order-status-cell-dropdown"
					onClick={toggleDropdown}
					className={`flex items-center justify-between gap-2 h-10 w-fit px-6 rounded-lg border hover:contrast-[95%] hover:bg-none ${statusStyle}`}
					variant="outline"
				>
					<p className="font-medium text-lg leading-none text-inherit pb-[2px]">
						{status}
					</p>
				</Button>

				<OrderStatusCellDropdown
					order={row.original}
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					status={status}
				/>
			</div>
			<DropdownBackdrop
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				className="bg-transparent"
			/>
		</Fragment>
	);
};

export default OrderStatusCell;
