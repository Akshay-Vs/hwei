import { create } from 'zustand';
import { createModalStore } from './create-modal-store';
import { TUseModalStore } from '@/types/modal-store-type';

export const useVariantItemModal = create<TUseModalStore>(createModalStore);