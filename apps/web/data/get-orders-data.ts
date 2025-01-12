import { TOrder } from "@/types/order";

export const orders = [
  {
    orderId: 'ORD-001',
    user: {
      name: 'Evelin Violet',
      avatar: 'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
      email: 'evelin.violet@example.com',
      address: '123 Main St, Anytown, USA',
    },
    products: [
      {
        id: '1',
        title: 'Yellow Sports Running Shoes',
        image: 'https://utfs.io/f/u628d5y0J6C1XsGgi6FQnH0wSx3JCMmKG5fDdjVpYL8rXaiy',
        price: 49.99,
        quantity: 2,
      },
      {
        id: '4',
        title: 'Black Sports Running Shoes',
        image: 'https://utfs.io/f/u628d5y0J6C1fQ0UlC24rUnM51aRxNZQdPFso9eJGC2A3qz6',
        price: 44.99,
        quantity: 1,
      },
    ],
    total: 144.97,
    orderDate: '2025-01-12T10:15:00Z',
    status: 'shipped',
  },
  {
    orderId: 'ORD-002',
    user: {
      name: 'Evelin Violet',
      avatar: 'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
      email: 'evelin.violet@example.com',
      address: '123 Main St, Anytown, USA',
    },
    products: [
      {
        id: '2',
        title: 'Ultimate Sports Running Shoes',
        image: 'https://utfs.io/f/u628d5y0J6C1Y06RtFoSlwMGK53yij9FpfRkIzt2nCroHcqL',
        price: 59.99,
        quantity: 1,
      },
      {
        id: '3',
        title: 'Brown Sports Running Shoes',
        image: 'https://utfs.io/f/u628d5y0J6C1DZ2McTk7wEgr2n3ySaMjAuLpzIFiVtkJoH1q',
        price: 39.99,
        quantity: 2,
      },
    ],
    total: 139.97,
    orderDate: '2025-01-10T14:45:00Z',
    status: 'delivered',
  },
  {
    orderId: 'ORD-003',
    user: {
      name: 'Evelin Violet',
      avatar: 'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
      email: 'evelin.violet@example.com',
      address: '123 Main St, Anytown, USA',
    },
    products: [
      {
        id: '4',
        title: 'Black Sports Running Shoes',
        image: 'https://utfs.io/f/u628d5y0J6C1fQ0UlC24rUnM51aRxNZQdPFso9eJGC2A3qz6',
        price: 44.99,
        quantity: 3,
      },
    ],
    total: 134.97,
    orderDate: '2025-01-08T18:30:00Z',
    status: 'processing',
  },
  {
    orderId: 'ORD-004',
    user: {
      name: 'Evelin Violet',
      avatar: 'https://utfs.io/f/u628d5y0J6C1JoULTTGePIhzvZk7l1rq9wNsymFSYQAnLOT0',
      email: 'evelin.violet@example.com',
      address: '123 Main St, Anytown, USA',
    },
    products: [
      {
        id: '1',
        title: 'Yellow Sports Running Shoes',
        image: 'https://utfs.io/f/u628d5y0J6C1XsGgi6FQnH0wSx3JCMmKG5fDdjVpYL8rXaiy',
        price: 49.99,
        quantity: 1,
      },
      {
        id: '3',
        title: 'Brown Sports Running Shoes',
        image: 'https://utfs.io/f/u628d5y0J6C1DZ2McTk7wEgr2n3ySaMjAuLpzIFiVtkJoH1q',
        price: 39.99,
        quantity: 1,
      },
    ],
    total: 89.98,
    orderDate: '2025-01-07T09:20:00Z',
    status: 'cancelled',
  },
] as TOrder[];


export const getOrders = async (): Promise<TOrder[]> => orders;

export const getOrderById = async (id: string): Promise<TOrder | undefined> => {
  const order = orders.find(order => order.orderId === id);
  return order;
}