import { Card } from '@hwei/ui/shadcn/card';
import Image from 'next/image';
import React from 'react';
import PreviewProductImages from './preview-product-images';

const EditorPreview = () => {
	return (
		<div className="flex flex-col gap-6 h-[56rem] w-3/5 sticky top-32">
			<Card className="h-full w-full gap-4 flex">
				<PreviewProductImages />
			</Card>
		</div>
	);
};

export default EditorPreview;
