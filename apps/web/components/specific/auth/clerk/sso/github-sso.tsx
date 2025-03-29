import React from 'react';
import ClerkSSO, { GlobalLoading } from './clerk-sso';
import { FaGithub } from 'react-icons/fa';

const GithubSSO = ({ isGlobalLoading }: GlobalLoading) => {
	return (
		<ClerkSSO
			isGlobalLoading={isGlobalLoading}
			provider="github"
			tooltip="Continue with github"
			icon={<FaGithub />}
		/>
	);
};

export default GithubSSO;
