import React from 'react';
import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from '@hwei/ui/shadcn/form';

import TextInput from '../../../../shared/input/text-input';
import { useVarientItem } from '../../hooks/use-varient-item';
import { TBaseLoading } from '@/types/base-props';

const NameInput = () => {
	const { varientItemModelForm: form, loading } = useVarientItem();

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
