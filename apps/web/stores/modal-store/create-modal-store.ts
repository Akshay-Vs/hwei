import { TUseModalStore } from '@/types/modal-store-type';
import { StateCreator } from 'zustand';

export const createModalStore: StateCreator<TUseModalStore> = (set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
});
