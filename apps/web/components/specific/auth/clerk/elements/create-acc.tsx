import Link from 'next/link';
import React from 'react';

const CreateAcc = () => {
	const url = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/auth/sign-up';

	return <Link href={url}>Create new account</Link>;
};

export default CreateAcc;
