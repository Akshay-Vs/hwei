import React from 'react';
import Link from 'next/link';

const ResetPasswordLink = () => {
	return (
		<Link href="/auth/reset-password">
			<p className="center gap-2">
				Forgot password?
				<span className="underline underline-offset-2">Reset now</span>
			</p>
		</Link>
	);
};

export default ResetPasswordLink;
