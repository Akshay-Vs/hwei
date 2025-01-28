'use client';
import TextInput from '@/components/shared/input/text-input';
import { useProductForm } from '@/hooks/use-product-form';
import { Card, CardHeader } from '@hwei/ui/shadcn/card';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from '@hwei/ui/shadcn/form';
import React, { useEffect } from 'react';

const ProductPrice = () => {
	const { form } = useProductForm();

	// get both minimum and maximum order values
	const minimumOrder = Number(form.watch('minimumOrder'));
	const maximumOrder = Number(form.getValues('maximumOrder'));

	useEffect(() => {
		// If minimum order is greater than maximum order, update maximum order to match minimum order
		if (
			(minimumOrder && maximumOrder && minimumOrder > maximumOrder) ||
			maximumOrder === 0
		) {
			form.setValue('maximumOrder', Number(minimumOrder));
		}
	}, [minimumOrder, maximumOrder, form]);

	const handleMinOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		form.setValue('minimumOrder', value);

		const currentMax = form.getValues('maximumOrder');
		if (currentMax && value > Number(currentMax)) {
			form.setValue('maximumOrder', value);
		}
	};

	return (
		<Card className="h-fit w-full gap-4 bg-highlight/20">
			<CardHeader className="p-0 gap-2 w-full">
				<h1 className="text-xl font-medium inline-flex items-center">Price</h1>
			</CardHeader>
			<div className="p-2 grid grid-cols-2 gap-4">
				<FormField
					control={form.control}
					name="unitPrice"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Unit Price</FormLabel>
							<FormControl>
								<TextInput
									type="number"
									placeholder="$99.99"
									min={0}
									{...field}
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="salePrice"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sale Price</FormLabel>
							<FormControl>
								<TextInput
									type="number"
									placeholder="$99.99"
									min={0}
									{...field}
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="minimumOrder"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Minimum Order</FormLabel>
							<FormControl>
								<TextInput
									type="number"
									placeholder="000"
									min={0}
									onChange={handleMinOrderChange}
									value={field.value}
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="maximumOrder"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Maximum Order</FormLabel>
							<FormControl>
								<TextInput
									type="number"
									placeholder="000"
									min={minimumOrder || 0}
									{...field}
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</Card>
	);
};

export default ProductPrice;
