import { TOrderedProduct } from "./product-type";
import { TUser } from "./user";

export type TOrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export type TOrder = {
  orderId: string;
  user: TUser;
  products: TOrderedProduct[];
  total: number;
  orderDate: string;
  updatedAt?: string;
  quantity: string;
  status: TOrderStatus;
};