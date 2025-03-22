'use client';
import React from 'react';
import { Form } from '@hwei/ui/shadcn/form';
import { z } from 'zod';

import ProductMetadata from './components/product-metadata';
import { useProductForm } from '@/hooks/use-product-form';
import ProductPrice from './components/product-price';
import EditorPreview from './components/editor-preview/editor-preview';
import ProductCategory from './components/product-category';
import ProductVariants from './components/product-varient/product-variants';
import { productSchema } from '@/schemas/product-schema';

const ProductEditor = () => {
	const { form } = useProductForm();

	const handleSubmit = (values: z.infer<typeof productSchema>) => {
		alert();
		console.log('submit', values);
	};
	return (
		<div className="flex flex-col gap-4 full">
			<Form {...form}>
				<form
					className="flex gap-4 w-full h-full"
					onSubmit={form.handleSubmit(handleSubmit)}
				>
					<div className="flex flex-col gap-4 w-1/2 h-full">
						<ProductMetadata />
						<ProductPrice />
						<ProductCategory />
						<ProductVariants />
					</div>

					<EditorPreview />
				</form>
			</Form>
		</div>
	);
};

export default ProductEditor;
