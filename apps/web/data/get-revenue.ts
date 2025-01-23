import { TTransaction } from "@/types/transaction-type";

const transactions = [
  {
    id: 'TRN-001',
    user: {
      name: 'Evelin Violet',
      avatar: 'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
      email: 'evelin.violet@example.com',
    },
    amount: 129.97,
    date: '2025-01-15T12:30:00Z',
    type: 'income',
    status: 'completed',
  }
] as TTransaction[]

export const getTransactions = async () => {
  return transactions;
}