'use client';
import TextArea from '@/components/shared/input/text-area';
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

const ProductMetadata = () => {
	const { control } = useFormContext();
	return (
		<EditorCard title="Product Metadata" className="bg-highlight/50">
			<div className="p-2 h-full">
				<FormField
					control={control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="product-name">Name</FormLabel>
							<FormControl>
								<TextInput
									id="product-name"
									type="text"
									placeholder="Product name"
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
