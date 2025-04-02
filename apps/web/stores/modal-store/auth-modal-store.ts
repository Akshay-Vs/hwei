import { TUseModalStore } from '@/types/modal-store-type';
import { create } from 'zustand';
import { createModalStore } from './create-modal-store';

export type step = 'sign-in' | 'sign-up' | 'reset-password';

interface AuthModalStore extends TUseModalStore {
  step: step;
  onStepChange: (view: step) => void;
}

export const useAuthModal = create<AuthModalStore>((set, get, store) => ({
  ...createModalStore(set, get, store),
  step: 'sign-in',
  onStepChange: (view) => set({ step: view }),
}));