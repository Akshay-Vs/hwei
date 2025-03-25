import React from 'react';
import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from '@hwei/ui/shadcn/form';

import TextInput from '../../../../shared/input/text-input';
import { useFormContext } from 'react-hook-form';
import { TBaseLoading } from '@/types/base-props';

const NameInput = ({loading}: TBaseLoading) => {
	const form = useFormContext();

	return (
		<FormField
			control={form.control}
			name="label"
			render={({ field }) => (
				<FormItem>
					<label>Label</label>
					<FormControl>
						<TextInput 
							type="text"
							placeholder="Item label"
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

export default NameInput;
