import { TCardInfo } from "@/types/card-info";

export const getProducts = async () => [
  {
    id: '1',
    title: 'Yellow Sports Running Shoes',
    image:
      'https://utfs.io/f/u628d5y0J6C1XsGgi6FQnH0wSx3JCMmKG5fDdjVpYL8rXaiy',
    stock: 47,
    price: 49.99,
    rating: 4.2,
    sales: 120,
  },
  {
    id: '2',
    title: 'Ultimate Sports Running Shoes',
    image:
      'https://utfs.io/f/u628d5y0J6C1Y06RtFoSlwMGK53yij9FpfRkIzt2nCroHcqL',
    stock: 246,
    price: 59.99,
    rating: 4.7,
    sales: 245,
  },
  {
    id: '3',
    title: 'Brown Sports Running Shoes',
    image:
      'https://utfs.io/f/u628d5y0J6C1DZ2McTk7wEgr2n3ySaMjAuLpzIFiVtkJoH1q',
    stock: 82,
    price: 39.99,
    rating: 4.0,
    sales: 98,
  },
  {
    id: '4',
    title: 'Black Sports Running Shoes',
    image:
      'https://utfs.io/f/u628d5y0J6C1fQ0UlC24rUnM51aRxNZQdPFso9eJGC2A3qz6',
    stock: 121,
    price: 44.99,
    rating: 4.5,
    sales: 173,
  },
  {
    id: '5',
    title: 'Yellow Sports Running Shoes',
    image:
      'https://utfs.io/f/u628d5y0J6C1XsGgi6FQnH0wSx3JCMmKG5fDdjVpYL8rXaiy',
    stock: 47,
    price: 49.99,
    rating: 4.2,
    sales: 120,
  },
  {
    id: '6',
    title: 'Ultimate Sports Running Shoes',
    image:
      'https://utfs.io/f/u628d5y0J6C1Y06RtFoSlwMGK53yij9FpfRkIzt2nCroHcqL',
    stock: 246,
    price: 59.99,
    rating: 4.7,
    sales: 245,
  },
  {
    id: '7',
    title: 'Ultimate Sports Running Shoes',
    image:
      'https://utfs.io/f/u628d5y0J6C1Y06RtFoSlwMGK53yij9FpfRkIzt2nCroHcqL',
    stock: 246,
    price: 59.99,
    rating: 4.7,
    sales: 245,
  },
  {
    id: '8',
    title: 'Yellow Sports Running Shoes',
    image:
      'https://utfs.io/f/u628d5y0J6C1XsGgi6FQnH0wSx3JCMmKG5fDdjVpYL8rXaiy',
    stock: 47,
    price: 49.99,
    rating: 4.2,
    sales: 120,
  },
  {
    id: '9',
    title: 'Ultimate Sports Running Shoes',
    image:
      'https://utfs.io/f/u628d5y0J6C1Y06RtFoSlwMGK53yij9FpfRkIzt2nCroHcqL',
    stock: 246,
    price: 59.99,
    rating: 4.7,
    sales: 245,
  },
  {
    id: '10',
    title: 'Ultimate Sports Running Shoes',
    image:
      'https://utfs.io/f/u628d5y0J6C1Y06RtFoSlwMGK53yij9FpfRkIzt2nCroHcqL',
    stock: 246,
    price: 59.99,
    rating: 4.7,
    sales: 245,
  },

];

export const getProductsLength = async (): Promise<TCardInfo> => {
  const products = await getProducts();
  const len = products.length;
  return {
    value: len,
    changeRate: 20,
    change: 'increase',
    affect: 'positive',
  }
}

export const getAvgRating = async (): Promise<TCardInfo> => {
  const products = await getProducts();
  const ratings = products.map((product) => product.rating);
  const sum = ratings.reduce((a, b) => a + b, 0);
  const avg = sum / ratings.length;
  return {
    value: avg.toFixed(2),
    changeRate: 10,
    change: 'increase',
    affect: 'positive',
  };
};

export const getLowStocks = async (limit = 8) => {
  const products = await getProducts();
  const stockThreshold = 1005;
  const lowStockProducts = products.filter(
    (product) => product.stock < stockThreshold
  );

  return { products: lowStockProducts.slice(0, limit), stockThreshold };
}