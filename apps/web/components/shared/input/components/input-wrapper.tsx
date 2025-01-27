import React, { PropsWithChildren } from 'react';

const InputWrapper = ({ children }: PropsWithChildren) => {
	return (
		<div className="p-2 flex items-center border-2 w-full h-fit border-stroke/20 focus-within:border-accent transition-colors duration-300 rounded-2xl">
			{children}
		</div>
	);
};

export default InputWrapper;
