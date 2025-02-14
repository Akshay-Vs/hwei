import { productSchema } from '@/schemas/product-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useProductForm = () => {
	const form = useForm<z.infer<typeof productSchema>>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: '',
			description: '',
			unitPrice: 0,
			salePrice: 0,
			minimumOrder: 0,
			maximumOrder: 0,
			category: '',
			tags: [],
		},
	});

	return { form };
};
