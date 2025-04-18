import React from 'react';
import { Dropdown } from '@/components/shared/dropdown/dropdown';
import { Button } from '@hwei/ui/shadcn/button';
import { STATUS_STYLES } from './constants';
import { useOrderStore } from '@/stores/order-store';
import type { TOrder, TOrderStatus } from '@/types/order-type';
import { cn } from '@hwei/ui/utils/cn';

interface OrderStatusCellDropdownProps {
	isOpen: boolean;
	onClose: () => void;
	status: TOrderStatus;
	order: TOrder;
}

const DROPDOWN_TEST_ID = 'order-status-dropdown';

export const OrderStatusCellDropdown: React.FC<
	OrderStatusCellDropdownProps
> = ({ isOpen, onClose, status: currentStatus, order }) => {
	const { updateOrder } = useOrderStore();

	// Memoize available statuses to prevent unnecessary recalculations
	const availableStatuses = React.useMemo(
		() =>
			Object.keys(STATUS_STYLES).filter(
				(status): status is TOrderStatus =>
					status !== currentStatus && status in STATUS_STYLES
			),
		[currentStatus]
	);

	// Handler for status updates with security checks
	const handleStatusUpdate = React.useCallback(
		(newStatus: TOrderStatus) => {
			if (!availableStatuses.includes(newStatus)) {
				console.error('Invalid status attempted');
				return;
			}

			try {
				updateOrder({
					...order,
					status: newStatus,
					updatedAt: new Date().toISOString(),
				});
				onClose();
			} catch (error) {
				console.error('Failed to update order status:', error);
				// TODO: Show toast or handle error
			}
		},
		[order, updateOrder, onClose, availableStatuses]
	);

	const buttonStyles = React.useMemo(
		() => ({
			base: 'center h-10 w-full px-6 rounded-lg border hover:contrast-95 hover:bg-none',
			text: 'font-medium text-base leading-none text-inherit pb-0.5',
		}),
		[]
	);

	return (
		<Dropdown
			isOpen={isOpen}
			onClose={onClose}
			labelledBy={DROPDOWN_TEST_ID}
			className="-translate-x-1/2 left-1/2 w-72"
			data-testid={DROPDOWN_TEST_ID}
		>
			<div className="grid grid-cols-2 gap-2 full">
				{availableStatuses.map((status) => (
					<Button
						key={status}
						className={cn(buttonStyles.base, STATUS_STYLES[status])}
						variant="outline"
						onClick={() => handleStatusUpdate(status)}
						data-testid={`${DROPDOWN_TEST_ID}-button-${status}`}
					>
						<p className={buttonStyles.text}>{status}</p>
					</Button>
				))}
			</div>
		</Dropdown>
	);
};

export default React.memo(OrderStatusCellDropdown);
