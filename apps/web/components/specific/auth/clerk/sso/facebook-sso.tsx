import React from 'react';
import ClerkSSO, { GlobalLoading } from './clerk-sso';
import { FaFacebook } from 'react-icons/fa';

const FacebookSSO = ({ isGlobalLoading }: GlobalLoading) => {
	return (
		<ClerkSSO
			isGlobalLoading={isGlobalLoading}
			provider="facebook"
			tooltip="Continue with facebook"
			icon={<FaFacebook />}
		/>
	);
};

export default FacebookSSO;
