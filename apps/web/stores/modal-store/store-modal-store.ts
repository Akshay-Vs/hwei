import { create } from 'zustand';
import { createModalStore } from './create-modal-store';
import { TUseModalStore } from '@/types/modal-store-type';

export const useStoreModal = create<TUseModalStore>(createModalStore);