import { TUseModalStore } from '@/types/modal-store-type';
import { create } from 'zustand';
import { createModalStore } from './create-modal-store';

export const useVariantItemModal = create<TUseModalStore>(createModalStore);