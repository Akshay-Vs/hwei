import { productShema } from '@/schemas/product-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useProductForm = () => {
	const form = useForm<z.infer<typeof productShema>>({
		resolver: zodResolver(productShema),
		defaultValues: {
			name: '',
			description: '',
			unitPrice: 0,
			salePrice: 0,
			minimumOrder: 0,
			maximumOrder: 0,
		},
	});

	return { form };
};
