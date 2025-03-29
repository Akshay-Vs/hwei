import TextInput from '@/components/shared/input/text-input';
import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
	FormLabel,
} from '@hwei/ui/shadcn/form';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TBaseLoading } from '@/types/base-props';

const StockAvailableInput = ({ loading }: TBaseLoading) => {
	const form = useFormContext();

	return (
		<FormField
			control={form.control}
			name="stock"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Stock available</FormLabel>
					<FormControl>
						<TextInput
							type="number"
							placeholder="stock available"
							onChange={(e) => field.onChange(Number(e.target.value) || 0)}
							value={field.value ?? 0}
							disabled={loading}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default StockAvailableInput;
