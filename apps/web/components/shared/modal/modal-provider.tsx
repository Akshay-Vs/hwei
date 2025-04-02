'use client';
import React, { Fragment } from 'react';
import StoreModal from './store-modal';
import VariantModal from './variant-modal';
import VariantItemModal from '@/components/specific/product-editor/modals/varient-item-model/variant-item-modal';
import AuthModal from '@/components/specific/auth/clerk/modals/auth-modal';

const ModalProvider = () => {
	return (
		<Fragment>
			<StoreModal />
			<VariantModal />
			<VariantItemModal />
			<AuthModal />
		</Fragment>
	);
};

export default ModalProvider;
