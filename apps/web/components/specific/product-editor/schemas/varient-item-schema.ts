import { z } from 'zod';

export const varientItemSchema = z.object({
	label: z.string().min(1, { message: 'Name is required' }),
	stock: z.number().min(1, { message: 'Stock is required' }),
	image: z.string({ message: 'Image is required in this variant' }),
});
