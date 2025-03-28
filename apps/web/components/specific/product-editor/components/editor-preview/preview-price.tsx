import { Separator } from '@hwei/ui/shadcn/separator';
import { Truck } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const PreviewPrice = () => {
	const { watch } = useFormContext();

	return (
		<>
			<Separator className="opacity-20" />
			<div className="flex items-center gap-4">
				<p className="text-3xl font-medium">${watch('salePrice')}</p>
				<span className="text-xl text-secondary/60 line-through">
					${watch('unitPrice')}
				</span>
			</div>
			<div className="flex items-center gap-4">
				<span className="text-sm text-secondary/60">50% off</span>
				<div className="flex items-center gap-2 text-secondary/60">
					<Truck className="w-4 h-4" />
					<p className="text-sm">Free Shipping above $100</p>
				</div>
			</div>
			<Separator className="opacity-20" />
		</>
	);
};

export default PreviewPrice;
