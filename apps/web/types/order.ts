import { TProduct } from "./product";
import { TUser } from "./user";

export type TOrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export type TOrder = {
  orderId: string;
  user: TUser;
  products: TProduct[];
  total: number;
  orderDate: string; // ISO 8601 string format
  status: TOrderStatus;
};