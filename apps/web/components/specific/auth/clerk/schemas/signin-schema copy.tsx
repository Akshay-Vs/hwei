import z from 'zod';

export const signinSchema = z.object({
	identifier: z.string().email(),
	password: z.string(),
});
