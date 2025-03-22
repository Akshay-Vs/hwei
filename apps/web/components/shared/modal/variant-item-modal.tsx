'use client';
import React, { useTransition } from 'react';
import { Button } from '@hwei/ui/shadcn/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@hwei/ui/shadcn/form';

import Modal from './modal';
import TextInput from '../input/text-input';
import { useVariantItemModal } from '@/stores/modal-store/variant-item-modal-store';

const formSchema = z.object({
	label: z.string().min(1, { message: 'Name is required' }),
	image: z.boolean(),
});

const VariantItemModal = () => {
	const [loading, startLoading] = useTransition();
	const store = useVariantItemModal();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			label: '',
			image: false,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		startLoading(async () => {
			// Add your submission logic here
			console.log(values);
			form.reset();
			store.onClose();
		});
	};

	return (
		<Modal
			title="Add Variant Item"
			description="Add a new variant item"
			isOpen={store.isOpen}
			onClose={store.onClose}
		>
			<div className="space-y-4 pb-4 py-2">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<label>Label</label>
									<FormControl>
										<TextInput
											type="text"
											placeholder="Item label"
											disabled={loading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="space-x-2 gap-4 pt-2 flex items-center justify-end w-full">
							<Button
								variant="outline"
								className="h-12 px-4"
								onClick={store.onClose}
								disabled={loading}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={loading} className="h-12 px-4">
								Create Variant
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	);
};

export default VariantItemModal;
