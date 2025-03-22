'use client';
import React, { useTransition } from 'react';
import Modal from './modal';
import { useVariantModal } from '@/stores/modal-store/variant-modal-store';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@hwei/ui/shadcn/form';
import TextInput from '../input/text-input';
import { Button } from '@hwei/ui/shadcn/button';
import { Checkbox } from '@hwei/ui/shadcn/checkbox';

const formSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	image: z.boolean(),
});

const VariantModal = () => {
	const [loading, startLoading] = useTransition();
	const store = useVariantModal();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
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
			title="Create Variant"
			description="Create a new variant"
			isOpen={store.isOpen}
			onClose={store.onClose}
		>
			<div className="space-y-4 pb-4 py-2">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<label>Name</label>
									<FormControl>
										<TextInput
											type="text"
											placeholder="Variant name"
											disabled={loading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center space-x-2 px-2 select-none mt-6">
										<FormControl>
											<Checkbox
												id="include-image"
												className="rounded-sm"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<label
											htmlFor="include-image"
											className="font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Enable thumbnail for this variant
										</label>
									</div>
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

export default VariantModal;
