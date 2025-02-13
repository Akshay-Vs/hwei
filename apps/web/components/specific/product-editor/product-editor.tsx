'use client';
import { Form } from '@hwei/ui/shadcn/form';
import React from 'react';
import ProductMetadata from './components/product-metadata';
import { useProductForm } from '@/hooks/use-product-form';
import ProductPrice from './components/product-price';
import EditorPreview from './components/editor-preview/editor-preview';
import ProductCategory from './components/product-category';
import ProductVariants from './components/product-variants';

const ProductEditor = () => {
	const { form } = useProductForm();
	return (
		<div className="flex flex-col gap-4 full">
			<Form {...form}>
				<form className="flex gap-4 w-full h-full">
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
