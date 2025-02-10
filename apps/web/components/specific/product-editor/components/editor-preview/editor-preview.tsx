import React from 'react';
import { Card } from '@hwei/ui/shadcn/card';

import PreviewProductImages from './preview-product-images';
import PreviewDescription from './preview-description';
import PreviewTags from './preview-tags';
import PreviewCategory from './preview-category';
import PreviewHeading from './preview-heading';
import PreviewPrice from './preview-price';
import PreviewVariants from './preview-variant';

const EditorPreview = () => {
	return (
		<div className="flex flex-col gap-6 h-[56rem] w-3/5 sticky top-32">
			<Card className="h-full w-full gap-4 flex flex-col overflow-auto">
				<PreviewProductImages />

				<div className="mt-4 col gap-5">
					<PreviewCategory />
					<PreviewHeading />
					<PreviewTags />
					<PreviewVariants />
				</div>

				<PreviewPrice />
				<PreviewDescription />
			</Card>
		</div>
	);
};

export default EditorPreview;
