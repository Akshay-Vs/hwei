import { TOrderStatus } from "@/types/order-type";

export const STATUS_STYLES: Record<TOrderStatus, string> = {
  delivered: 'bg-emerald-100 border-emerald-400 text-emerald-900',
  shipped: 'bg-violet-100 border-violet-400 text-violet-900',
  processing: 'bg-yellow-100 border-yellow-400 text-yellow-900',
  cancelled: 'bg-red-100 border-red-400 text-red-900',
  returned: 'bg-gray-100 border-gray-400 text-gray-900',
};
