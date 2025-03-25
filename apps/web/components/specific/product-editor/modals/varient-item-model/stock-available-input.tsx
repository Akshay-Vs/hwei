import TextInput from '@/components/shared/input/text-input';
import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from '@hwei/ui/shadcn/form';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TBaseLoading } from '@/types/base-props';

const StockAvailableInput = ({loading}:TBaseLoading) => {
	const form = useFormContext();
	return (
		<FormField
			control={form.control}
			name="stock"
			render={({ field }) => (
				<FormItem>
					<label>Stock available</label>
					<FormControl>
						<TextInput
							type="number"
							placeholder="stock available"
							disabled={loading}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default StockAvailableInput;
