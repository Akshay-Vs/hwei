'use client';
import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@hwei/ui/shadcn/button';
import { Input } from '@hwei/ui/shadcn/input';
import InputWrapper from './components/input-wrapper';

const PasswordInput = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setShowPassword((prev) => !prev);
	};

	return (
		<InputWrapper>
			<Input
				ref={ref}
				type={showPassword ? 'text' : 'password'}
				{...props}
				className="full !text-lg"
			/>
			<Button
				variant="ghost"
				onClick={(e) => togglePassword(e)}
				className="w-5 h-5 p-0 mr-2"
				type="button"
			>
				{showPassword ? <EyeOff /> : <Eye />}
			</Button>
		</InputWrapper>
	);
});

export default PasswordInput;
