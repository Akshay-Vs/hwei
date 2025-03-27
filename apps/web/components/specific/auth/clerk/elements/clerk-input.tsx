import React from 'react';
import TextInput from '@/components/shared/input/text-input';
import {
	Field,
	Label as ClerkLabel,
	Input as FieldInput,
	FieldError,
} from '@clerk/elements/common';

interface ClerkInputProps {
	name: 'identifier' | 'name' | 'password';
	label: string;
	placeholder: string;
	type: string;
}

const ClerkInput = ({ name, label, placeholder, type }: ClerkInputProps) => {
	return (
		<Field name={name} className="col gap-4">
			<ClerkLabel asChild>
				<label>{label}</label>
			</ClerkLabel>

			<FieldInput className="px-4" asChild>
				<TextInput type={type} placeholder={placeholder} className="h-12" />
			</FieldInput>

			<FieldError className="block text-sm text-destructive" />
		</Field>
	);
};

export default ClerkInput;
