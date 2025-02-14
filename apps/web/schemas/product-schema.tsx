import { z } from 'zod';

export const productSchema = z
	.object({
		name: z.string().min(1, { message: 'Name is required' }),
		description: z.string().min(1, { message: 'Description is required' }),
		unitPrice: z
			.number()
			.positive({ message: 'Unit price must be greater than 0' }),
		salePrice: z
			.number()
			.positive({ message: 'Sale price must be greater than 0' }),
		minimumOrder: z
			.number()
			.int({ message: 'Minimum order must be an integer' })
			.nonnegative({ message: 'Minimum order cannot be negative' }),
		maximumOrder: z
			.number()
			.int({ message: 'Maximum order must be an integer' })
			.nonnegative({ message: 'Maximum order cannot be negative' }),
		category: z.string().min(1, { message: 'Category is required' }),
		tags: z.array(z.string()).default([]),
	})
	.refine(({ minimumOrder, maximumOrder }) => maximumOrder >= minimumOrder, {
		message: 'Maximum order must be greater than or equal to minimum order',
		path: ['maximumOrder'],
	});
