'use client';
import React, { useTransition } from 'react';
import { Form } from '@hwei/ui/shadcn/form';

import Modal from '@/components/shared/modal/modal';
import NameInput from './name-input';
import ImageInput from './image-input';
import FormActions from './form-actions';
import StockAvailableInput from './stock-available-input';

import { useVarientForm } from '../../hooks/use-varient-form';
import { varientItemSchema } from '../../schemas/varient-item-schema';
import { z } from 'zod';
import { useVariantItemModal } from '@/stores/modal-store/variant-item-modal-store';

const VariantItemModal = () => {
	const { varientItemModelForm: form } = useVarientForm();
	const [loading, startLoading] = useTransition();
	const store = useVariantItemModal();

	const onSubmit = async (values: z.infer<typeof varientItemSchema>) => {
		startLoading(async () => {
			//TODO: Add submission logic here
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
						<NameInput loading={loading} />
						<StockAvailableInput loading={loading} />
						<ImageInput loading={loading} />
						<FormActions loading={loading}  />
					</form>
				</Form>
			</div>
		</Modal>
	);
};

export default VariantItemModal;
