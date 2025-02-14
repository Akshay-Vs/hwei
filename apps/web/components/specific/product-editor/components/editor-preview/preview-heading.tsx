'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const PreviewHeading = () => {
	const { watch } = useFormContext();
	return (
		<label
			className="text-4xl font-semibold line-clamp-3"
			htmlFor="product-name"
			aria-live="polite"
		>
			{watch('name') || 'Product Name'}
		</label>
	);
};

export default PreviewHeading;
