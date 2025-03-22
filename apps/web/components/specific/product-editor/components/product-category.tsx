'use client';
import TextInput from '@/components/shared/input/text-input';

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
				<div className="flex gap-4 w-full">
					<FormField
						control={control}
						name="brand"
						render={({ field }) => (
							<FormItem className="w-1/2">
								<FormLabel htmlFor="product-brand">Brand</FormLabel>
								<FormControl>
									<TextInput
										id="product-brand"
										type="text"
										placeholder="Product brand"
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
						name="category"
						render={({ field }) => (
							<FormItem className="w-1/2">
								<FormLabel htmlFor="product-category">Category</FormLabel>
								<FormControl>
									<TextInput
										id="product-category"
										type="text"
										placeholder="Product category"
										{...field}
									/>
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

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
