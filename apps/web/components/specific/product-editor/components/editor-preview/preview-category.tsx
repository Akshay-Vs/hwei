import React from 'react';
import { useFormContext } from 'react-hook-form';

const PreviewCategory = () => {
	const { watch } = useFormContext();

	return (
		<p className="text-lg text-secondary/60 cursor-pointer">
			{watch('brand') || 'Brand'} / {watch('category') || 'Category'}
		</p>
	);
};

export default PreviewCategory;
