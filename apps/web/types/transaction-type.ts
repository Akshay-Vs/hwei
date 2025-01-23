import { TUser } from "./user";

export type TTransaction = {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  user: TUser
};