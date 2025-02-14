import React from 'react';
import { useFormContext } from 'react-hook-form';

const PreviewDescription = () => {
	const { watch } = useFormContext();

	return (
		<>
			<h3 className="mt-4 text-xl">Product description</h3>
			<p className="text-lg text-secondary/60">
				{watch('description') || 'Product description'}
			</p>
		</>
	);
};

export default PreviewDescription;
