import { Button } from '@hwei/ui/shadcn/button';
import React from 'react';

const PreviewTags = () => {
	return (
		<div className="flex items-center gap-4">
			<Button variant="tag">
				<p className="text-sm">Running Shoes</p>
			</Button>
			<Button variant="tag">
				<p className="text-sm">Casual Sneakers</p>
			</Button>
			<Button variant="tag">
				<p className="text-sm">Limited Edition</p>
			</Button>
		</div>
	);
};

export default PreviewTags;
