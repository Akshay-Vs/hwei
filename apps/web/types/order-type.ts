import { TProduct } from "./product-type";
import { TUser } from "./user";

export type TOrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export type TOrder = {
  orderId: string;
  user: TUser;
  products: TProduct[];
  total: number;
  orderDate: string;
  updatedAt?: string;
  status: TOrderStatus;
};