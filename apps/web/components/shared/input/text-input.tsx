import { Input } from '@hwei/ui/shadcn/input';
import React, { InputHTMLAttributes } from 'react';
import InputWrapper from './components/input-wrapper';

const TextInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<InputWrapper>
			<Input {...props} className="full !text-lg" />
		</InputWrapper>
	);
};

export default TextInput;
