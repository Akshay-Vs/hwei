import { Button } from '@hwei/ui/shadcn/button';
import React from 'react';

const PreviewTags = () => {
	const tags = [
		{
			id: '1',
			label: 'New',
		},
		{
			id: '2',
			label: 'Sale',
		},
		{
			id: '3',
			label: 'Trending',
		},
	];

	return (
		<div className="flex items-center gap-4" onClick={(e) => e.preventDefault()}>
			{tags.map((tag) => (
				<Button variant="tag" key={tag.id}>
					<p className="text-sm">#{tag.label}</p>
				</Button>
			))}
		</div>
	);
};

export default PreviewTags;
