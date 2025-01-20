import React from 'react';
import { Dropdown } from '@/components/shared/dropdown/dropdown';
import { Button } from '@hwei/ui/shadcn/button';
import { STATUS_STYLES } from './constants';
import { useOrderStore } from '@/stores/order-store';
import type { TOrder, TOrderStatus } from '@/types/order-type';

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
			text: 'font-medium text-lg leading-none text-inherit pb-0.5',
		}),
		[]
	);

	return (
		<Dropdown
			isOpen={isOpen}
			onClose={onClose}
			labelledBy={DROPDOWN_TEST_ID}
			className="w-44 -translate-x-1/2 left-1/2 rounded-3xl p-3"
			data-testid={DROPDOWN_TEST_ID}
		>
			<h4 className="text-lg font-semibold">Update status</h4>
			{availableStatuses.map((status) => (
				<Button
					key={status}
					className={`${buttonStyles.base} ${STATUS_STYLES[status]}`}
					variant="outline"
					onClick={() => handleStatusUpdate(status)}
					data-testid={`${DROPDOWN_TEST_ID}-button-${status}`}
				>
					<p className={buttonStyles.text}>{status}</p>
				</Button>
			))}
		</Dropdown>
	);
};

export default React.memo(OrderStatusCellDropdown);
