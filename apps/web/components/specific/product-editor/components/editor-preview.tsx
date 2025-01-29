import { Card } from '@hwei/ui/shadcn/card';
import React from 'react';

const EditorPreview = () => {
	return (
		<div className="flex flex-col gap-6 h-[56rem] w-3/5 sticky top-32">
			<Card className="h-full w-full gap-4 flex items-center justify-center">
				Preview
			</Card>
		</div>
	);
};

export default EditorPreview;
