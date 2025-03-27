import React from 'react';
import ClerkSSO, { GlobalLoading } from './clerk-sso';
import { FaGoogle } from 'react-icons/fa';

const GoogleSSO = ({ isGlobalLoading }: GlobalLoading) => {
	return (
		<ClerkSSO
			isGlobalLoading={isGlobalLoading}
			provider="google"
			tooltip="Continue with google"
			icon={<FaGoogle />}
		/>
	);
};

export default GoogleSSO;
