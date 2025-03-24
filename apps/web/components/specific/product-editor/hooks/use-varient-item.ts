import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { varientItemSchema } from '../schemas/varient-item-schema';
import { useVariantItemModal } from '@/stores/modal-store/variant-item-modal-store';
import { useTransition } from 'react';

export const useVarientItem = () => {
	const [loading, startLoading] = useTransition();
	const store = useVariantItemModal();

	const varientItemModelForm = useForm<z.infer<typeof varientItemSchema>>({
		resolver: zodResolver(varientItemSchema),
		defaultValues: {
			label: '',
			image: undefined,
		},
	});


	const onSubmit = async (values: z.infer<typeof varientItemSchema>) => {
		startLoading(async () => {
			//TODO: Add submission logic here
			console.log(values);
			varientItemModelForm.reset();
			store.onClose();
		});
	};

	return {
		loading,
		startLoading,
		store,
		varientItemModelForm,
		onSubmit,
	};
};
