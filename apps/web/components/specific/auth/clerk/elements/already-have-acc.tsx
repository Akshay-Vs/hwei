import Link from 'next/link';
import React from 'react';

const AlreadyHaveAcc = () => {
	const url = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/auth/sign-in';

	return <Link href={url}>Already have an account?</Link>;
};

export default AlreadyHaveAcc;
