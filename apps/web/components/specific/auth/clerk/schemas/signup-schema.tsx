import z from 'zod';

// Step one - email & username
export const signupSchemaStart = z.object({
	identifier: z.string().email(),
	fullName: z
		.string()
		.min(1, { message: 'Full name is required' })
		.max(100, { message: 'Full name is too long' }),
});

// Step two - password
export const signupSchemaPassword = z
	.object({
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(64, { message: 'Password is too long' })
			.regex(/[0-9]/, 'Must contain number')
			.regex(/[^A-Za-z0-9]/, 'Must contain special character'),
		confirmPassword: z.string(),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (password !== confirmPassword) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords do not match',
				path: ['confirmPassword'],
			});
		}
	});

// Step three - verification code
export const signupSchemaVerification = z.object({
	code: z.string().min(1, { message: 'Verification code is required' }),
});

export const signupSchema = signupSchemaStart.and(signupSchemaPassword);

export type SignupStepOneValues = z.infer<typeof signupSchemaStart>;
export type SignupStepTwoValues = z.infer<typeof signupSchemaPassword>;
export type SignupValues = z.infer<typeof signupSchema>;
