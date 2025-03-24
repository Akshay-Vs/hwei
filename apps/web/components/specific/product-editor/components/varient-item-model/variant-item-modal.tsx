'use client';
import React from 'react';
import { Form } from '@hwei/ui/shadcn/form';

import Modal from '@/components/shared/modal/modal';
import { useVarientItem } from '../../hooks/use-varient-item';
import NameInput from './name-input';
import ImageInput from './image-input';
import SubmitButton from './submit-button';
import StockAvailableInput from './stock-available-input';

const VariantItemModal = () => {
	const { varientItemModelForm: form, store, onSubmit } = useVarientItem();

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
						<NameInput/>
						<StockAvailableInput />
						<ImageInput/>
						<SubmitButton/>
					</form>
				</Form>
			</div>
		</Modal>
	);
};

export default VariantItemModal;
