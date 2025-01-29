'use client';
import TextArea from '@/components/shared/input/text-area';
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

const ProductMetadata = () => {
	const { form } = useProductForm();
	return (
		<EditorCard title="Product Metadata" className="bg-highlight/50">
			<div className="p-2 h-full">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<TextInput type="text" placeholder="Product name" {...field} />
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<TextArea placeholder="Product description" {...field} />
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

export default ProductMetadata;
