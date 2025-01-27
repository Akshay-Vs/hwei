import React, { ComponentProps } from 'react';
import { Textarea as CnArea } from '@hwei/ui/shadcn/textarea';
import InputWrapper from './components/input-wrapper';

const TextArea = ({ ...props }: ComponentProps<typeof CnArea>) => {
	return (
		<InputWrapper>
			<CnArea {...props} className="full min-h-60 !text-xl resize-none" />
		</InputWrapper>
	);
};

export default TextArea;
