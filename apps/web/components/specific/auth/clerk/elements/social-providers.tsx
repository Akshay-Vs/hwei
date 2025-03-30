import React from 'react';
import FacebookSSO from '../sso/facebook-sso';
import GithubSSO from '../sso/github-sso';
import GoogleSSO from '../sso/google-sso';
import { Root } from '@clerk/elements/sign-in';
import { Loading } from '@clerk/elements/common';

const SocialProviders = () => {
	return (
		<div className="col justify-start items-center gap-4 h-10">
			<p>or continue with</p>
			<div className="center gap-6">
				<Root>
					<Loading>
						{(isGlobalLoading) => (
							<>
								<GoogleSSO isGlobalLoading={isGlobalLoading} />
								<GithubSSO isGlobalLoading={isGlobalLoading} />
								<FacebookSSO isGlobalLoading={isGlobalLoading} />
							</>
						)}
					</Loading>
				</Root>
			</div>
		</div>
	);
};

export default SocialProviders;
