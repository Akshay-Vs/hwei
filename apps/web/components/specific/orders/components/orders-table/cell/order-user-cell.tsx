import { TOrder } from '@/types/order';
import { Row } from '@tanstack/react-table';
import Image from 'next/image';
import React from 'react';

const OrderUserCell = ({ row }: { row: Row<TOrder> }) => {
	return (
		<div className="flex items-center gap-8 h-16">
			<Image
				src={row.original.user.avatar}
				alt={row.original.user.name}
				width={50}
				height={50}
				className="rounded-full h-10 w-10 object-center object-cover"
			/>
			<div className="flex flex-col">
				<p className="text-secondary">{row.getValue('username')}</p>
				<p className="text-secondary text-sm">{row.original.user.email}</p>
			</div>
		</div>
	);
};

export default OrderUserCell;
