'use client';
import TextArea from '@/components/shared/input/text-area';
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
import React from 'react';

const ProductMetadata = () => {
	const { form } = useProductForm();
	return (
		<Card className="h-fit w-full gap-4">
			<CardHeader className="p-0 gap-2 w-full">
				<h1 className="text-xl font-medium inline-flex items-center">
					Product Metadata
				</h1>
			</CardHeader>
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
		</Card>
	);
};

export default ProductMetadata;
