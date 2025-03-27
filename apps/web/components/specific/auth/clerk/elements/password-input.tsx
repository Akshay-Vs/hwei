import React from 'react';
import ClerkInput from './clerk-input';

const PasswordInput = () => {
	return (
		<ClerkInput
			label="password"
			name="password"
			placeholder="******"
			type="password"
		/>
	);
};

export default PasswordInput;
