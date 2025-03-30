import { z } from 'zod';

export const resetSchemaEmail = z.object({
	email: z.string().email(),
});

export const resetSchemaPassword = z
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

export const resetSchemaVerification = z.object({
	code: z.string().min(6, { message: 'Invalid verification code' }),
});

export const resetSchema = resetSchemaEmail
	.and(resetSchemaPassword)
	.and(resetSchemaVerification);

export type resetSchemaType = z.infer<typeof resetSchema>;
export type resetSchemaEmail = z.infer<typeof resetSchemaEmail>;
export type resetSchemaPassword = z.infer<typeof resetSchemaPassword>;
export type resetSchemaVerification = z.infer<typeof resetSchemaVerification>;
