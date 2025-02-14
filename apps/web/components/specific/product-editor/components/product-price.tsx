import React, { useEffect } from 'react';
import TextInput from '@/components/shared/input/text-input';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from '@hwei/ui/shadcn/form';
import EditorCard from './editor-card';
import { useFormContext } from 'react-hook-form';

const ProductPrice = () => {
	const { control, watch, setValue, getValues } = useFormContext(); // ✅ Use only context

	// get both minimum and maximum order values
	const minimumOrder = Number(watch('minimumOrder'));
	const maximumOrder = Number(getValues('maximumOrder'));

	useEffect(() => {
		if (
			(minimumOrder && maximumOrder && minimumOrder > maximumOrder) ||
			maximumOrder === 0
		) {
			setValue('maximumOrder', Number(minimumOrder));
		}
	}, [minimumOrder, maximumOrder, setValue]);

	const handleMinOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		setValue('minimumOrder', value);

		const currentMax = getValues('maximumOrder');
		if (currentMax && value > Number(currentMax)) {
			setValue('maximumOrder', value);
		}
	};

	return (
		<EditorCard title="Price">
			<div className="p-2 grid grid-cols-2 gap-4">
				<FormField
					control={control}
					name="unitPrice"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Unit Price</FormLabel>
							<FormControl>
								<TextInput
									type="number"
									placeholder="$99.99"
									min={0}
									value={field.value || ''}
									onChange={(e) => field.onChange(Number(e.target.value) || 0)}
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="salePrice"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sale Price</FormLabel>
							<FormControl>
								<TextInput
									type="number"
									placeholder="$99.99"
									min={0}
									value={field.value || ''}
									onChange={(e) => field.onChange(Number(e.target.value) || 0)}
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
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
					control={control}
					name="maximumOrder"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Maximum Order</FormLabel>
							<FormControl>
								<TextInput
									type="number"
									placeholder="000"
									min={minimumOrder || 0}
									value={field.value || ''}
									onChange={(e) => field.onChange(Number(e.target.value) || 0)}
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</EditorCard>
	);
};

export default ProductPrice;
