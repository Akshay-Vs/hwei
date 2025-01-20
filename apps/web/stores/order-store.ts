import { TOrder } from '@/types/order-type';
import { create } from 'zustand';

interface OrderStore {
  orders: TOrder[];
  getOrder: (orderId: string) => TOrder | undefined;
  setOrders: (orders: TOrder[]) => void;
  updateOrder: (order: TOrder) => void;
}

export const useOrderStore = create<OrderStore>()((set, get) => ({
  orders: [],
  getOrder: (orderId: string) => {
    return get().orders.find((order: TOrder) => order.orderId === orderId);
  },
  setOrders: (orders: TOrder[]) => set({ orders }),
  updateOrder: (order: TOrder) => set((state) => ({
    orders: state.orders.map((iter) =>
      iter.orderId === order.orderId ? order : iter
    )
  }))
}));