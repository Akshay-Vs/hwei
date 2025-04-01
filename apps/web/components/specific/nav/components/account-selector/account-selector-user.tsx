'use client';
import { useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import React, { Fragment } from 'react';

const AccountSelectorUser = () => {
	const { user } = useClerk();

	return (
		<Fragment>
			<div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200">
				{user ? (
					<Image
						src={user?.imageUrl}
						width={86}
						height={86}
						alt="Profile"
						className="full object-center object-cover"
					/>
				) : (
					<div className="bg-slate-300 animate-pulse full" />
				)}
			</div>

			<div>
				<p className="text-sm font-normal">Welcome</p>
				{user ? (
					<p className="text-lg font-medium h-6">{user.fullName}</p>
				) : (
					<div className="bg-slate-300 h-4 mt-2 w-24 animate-pulse" />
				)}
			</div>
		</Fragment>
	);
};

export default AccountSelectorUser;
