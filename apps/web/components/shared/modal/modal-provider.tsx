'use client';
import React, { Fragment } from 'react';
import StoreModal from './store-modal';
import VariantModal from './variant-modal';
import VariantItemModal from '@/components/specific/product-editor/modals/varient-item-model/variant-item-modal';

const ModalProvider = () => {
	return (
		<Fragment>
			<StoreModal />
			<VariantModal />
			<VariantItemModal />
		</Fragment>
	);
};

export default ModalProvider;
