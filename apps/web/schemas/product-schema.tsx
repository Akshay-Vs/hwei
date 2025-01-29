import { z } from 'zod';

export const productShema = z
	.object({
		name: z.string().min(1, 'Name is required'),
		description: z.string().min(1, 'Description is required'),
		unitPrice: z.number().min(1, 'Unit price is required'),
		salePrice: z.number().min(1, 'Sale price is required'),
		minimumOrder: z.number().min(0),
		maximumOrder: z.number().min(0),
		category: z.string(),
		tags: z.string().array(),
	})
	.refine((data) => data.maximumOrder >= data.minimumOrder, {
		message: 'Maximum order must be greater than or equal to minimum order',
		path: ['maximumOrder'],
	});
