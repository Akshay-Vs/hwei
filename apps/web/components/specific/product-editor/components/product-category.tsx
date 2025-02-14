'use client';
import TextInput from '@/components/shared/input/text-input';
import { useProductForm } from '@/hooks/use-product-form';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from '@hwei/ui/shadcn/form';
import React from 'react';
import EditorCard from './editor-card';
import { useFormContext } from 'react-hook-form';

const ProductCategory = () => {
	const { control } = useFormContext();

	return (
		<EditorCard title="Grouping">
			<div className="p-2 flex flex-col gap-4">
				<FormField
					control={control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<FormControl>
								<TextInput
									type="text"
									placeholder="Select category"
									{...field}
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="tags"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tags</FormLabel>
							<FormControl>
								<TextInput type="text" placeholder="#tags" {...field} />
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

export default ProductCategory;
