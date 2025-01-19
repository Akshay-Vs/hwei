import Image from 'next/image';
import React, { Fragment } from 'react';

const AccountSelectorUser = () => {
	return (
		<Fragment>
			<Image
				src="https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0"
				width={86}
				height={86}
				alt="Profile"
				className="w-16 h-16 rounded-full object-center object-cover"
			/>

			<div>
				<p className="text-sm font-normal">Welcome</p>
				<p className="text-lg font-medium">Evelin Violet</p>
			</div>
		</Fragment>
	);
};

export default AccountSelectorUser;
