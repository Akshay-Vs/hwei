import { TStore } from '@/types/store-type';
import { create } from 'zustand';

interface SelectedStore {
  selectedStore: TStore | null;
  setSelectedStore: (store: TStore) => void;
}

export const useSelectedStore = create<SelectedStore>((set) => ({
  selectedStore: null,
  setSelectedStore: (store) => set({ selectedStore: store }),
}));