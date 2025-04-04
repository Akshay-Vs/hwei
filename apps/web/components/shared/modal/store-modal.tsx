'use client';
import React, { useTransition } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@hwei/ui/shadcn/form';

import { Button } from '@hwei/ui/shadcn/button';
import { useStoreModal } from '@/stores/modal-store/store-modal-store';
import { Toast } from '@/utils/toast';
import Modal from './modal';
import TextInput from '../input/text-input';
import IconSelector from '../input/icon-selector/icon-selector';

const formSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	icon: z.string(),
});

const StoreModal = () => {
	const [loading, startLoading] = useTransition();

	const store = useStoreModal();
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			icon: 'Store',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		startLoading(async () => {
			try {
				const res = await axios.post('/api/stores', values);
				form.reset();
				Toast({
					type: 'success',
					message: 'Store created successfully',
				});
				router.push(`/${res.data.id}`);
			} catch (err) {
				Toast({
					type: 'error',
					message: 'Error creating store',
				});
			}
		});
	};

	const onClose = () => {
		store.onClose();
		form.reset();
	};

	return (
		<Modal
			title="Create Store"
			description="Create a new store"
			isOpen={store.isOpen}
			onClose={onClose}
		>
			<div>
				<div className="space-y-4 pb-4 py-2">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-4"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<TextInput
												type="text"
												placeholder="My store"
												disabled={loading}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<IconSelector
								value={form.watch('icon')}
								onChange={(icon: string) => {
									form.setValue('icon', icon);
								}}
							/>

							<div className="space-x-2 gap-4 pt-2 flex items-center justify-end w-full">
								<Button
									variant="outline"
									className="h-12 px-4"
									onClick={onClose}
									disabled={loading}
								>
									Cancel
								</Button>
								<Button type="submit" disabled={loading} className="h-12 px-4">
									Create Store
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};

export default StoreModal;
