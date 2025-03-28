export type TProduct = {
  id: string;
  title: string;
  image: string;
  price: number;
  stock: number;
  rating: number;
  sales: number;
};

export type TOrderedProduct = {
  id: string,
  title: string,
  image: string,
  price: number
  quantity: number,
}