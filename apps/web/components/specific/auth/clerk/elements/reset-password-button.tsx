import React from 'react';
import { Action } from '@clerk/elements/sign-in';

const ResetPasswordButton = () => {
	return <Action navigate="forgot-password">Reset Password</Action>;
};

export default ResetPasswordButton;
