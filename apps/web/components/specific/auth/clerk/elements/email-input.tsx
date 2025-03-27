import React from 'react';
import ClerkInput from './clerk-input';

const EmailInput = () => {
	return (
		<ClerkInput
			name="identifier"
			type="email"
			label="Email"
			placeholder="Evelinviolet@mail.com"
		/>
	);
};

export default EmailInput;
