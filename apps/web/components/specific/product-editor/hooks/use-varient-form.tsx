import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { varientItemSchema } from '../schemas/varient-item-schema';

export const useVarientForm = () => {
	const varientItemModelForm = useForm<z.infer<typeof varientItemSchema>>({
		resolver: zodResolver(varientItemSchema),
		defaultValues: {
			label: '',
			stock: 0,
			image: '',
		},
	});

	return { varientItemModelForm };
};
