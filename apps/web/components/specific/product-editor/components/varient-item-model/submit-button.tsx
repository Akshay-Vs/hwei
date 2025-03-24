import React from 'react';
import { Button } from '@hwei/ui/shadcn/button';

import { useVarientItem } from '../../hooks/use-varient-item';

const SubmitButton = () => {
	const { loading, store } = useVarientItem();

	return (
		<div className="space-x-2 gap-4 pt-2 flex items-center justify-end w-full">
			<Button
				variant="outline"
				className="h-12 px-4"
				onClick={store.onClose}
				disabled={loading}
			>
				Cancel
			</Button>
			<Button type="submit" disabled={loading} className="h-12 px-4">
				Create Variant
			</Button>
		</div>
	);
};

export default SubmitButton;
