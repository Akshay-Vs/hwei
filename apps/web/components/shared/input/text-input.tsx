import { Input } from '@hwei/ui/shadcn/input';
import React, { forwardRef, InputHTMLAttributes } from 'react';
import InputWrapper from './components/input-wrapper';

const TextInput = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement>
>(({ ...props }) => {
	return (
		<InputWrapper>
			<Input {...props} className="full !text-lg" />
		</InputWrapper>
	);
});

export default TextInput;
