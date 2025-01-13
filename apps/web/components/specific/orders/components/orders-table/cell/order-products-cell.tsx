import { TOrder } from '@/types/order';
import { TProduct } from '@/types/product';
import { Row } from '@tanstack/react-table';
import Image from 'next/image';
import React from 'react';

const OrderProductsCell = ({ row }: { row: Row<TOrder> }) => {
	return (
		<div className="flex gap-2">
			{row.getValue<TProduct[]>('products').map((product: TProduct) => (
				<div key={product.id} className="flex items-center gap-4">
					<Image
						src={product.image}
						alt={product.title}
						width={100}
						height={100}
						className="rounded w-14 h-14"
					/>
				</div>
			))}
		</div>
	);
};

export default OrderProductsCell;
