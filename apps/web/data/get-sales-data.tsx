import { TCardInfo } from '@/types/card-info-type';
import { getProducts } from './get-product-data';

import { Products } from '@/components/specific/products/components/products-table/product-columns';
// TODO: change products import to prisma when it's ready

export const getMonthlySales = async (): Promise<TCardInfo> => {
	const products = await getProducts();
	const sales = products.map((product) => product.sales);
	const sum = sales.reduce((a, b) => a + b, 0);
	return {
		value: sum,
		changeRate: 10,
		change: 'increase',
		affect: 'positive',
	};
};

export const getTopSellers = async (
	limit = 4
): Promise<TCardInfo & { products: Products[] }> => {
	const products = await getProducts();
	const topSellers = products.slice(0, limit);
	const sum = topSellers.reduce((a, b) => a + b.sales, 0);
	return {
		products: products.slice(0, limit),
		value: sum,
		changeRate: 10,
		change: 'increase',
		affect: 'positive',
	};
};
