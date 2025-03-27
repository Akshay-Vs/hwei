import React from 'react';
import FacebookSSO from '../sso/faceboot-sso';
import GithubSSO from '../sso/github-sso';
import GoogleSSO from '../sso/google-sso';
import { GlobalLoading } from '../sso/clerk-sso';

const SocialProviders = ({ isGlobalLoading }: GlobalLoading) => {
	return (
		<div className="col-center gap-4">
			<p>or continue with</p>
			<div className="center gap-6">
				<GoogleSSO isGlobalLoading={isGlobalLoading} />
				<GithubSSO isGlobalLoading={isGlobalLoading} />
				<FacebookSSO isGlobalLoading={isGlobalLoading} />
			</div>
		</div>
	);
};

export default SocialProviders;
