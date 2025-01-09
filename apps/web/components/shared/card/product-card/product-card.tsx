import { cn } from '@hwei/ui/utils/cn';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';

interface ProductCardProps extends PropsWithChildren {
	title: string;
	img: string;
	clamp?: number;
	className?: string;
}

const ProductCard = ({
	title,
	img,
	children,
	className,
	clamp = 2,
}: ProductCardProps) => {
	return (
		<div
			className={cn(
				'flex flex-col gap-2 cursor-pointer flex-shrink w-52 h-full',
				className
			)}
		>
			<Image
				src={img}
				alt={title}
				width={200}
				height={200}
				className="rounded-[30px] w-52 h-48 object-cover object-center hover:shadow-sm transition-all duration-300"
			/>
			<div className="flex flex-col justify-between">
				<h2 className={`text-xl font-medium line-clamp-${clamp} max-w-52`}>
					{title}
				</h2>
				{children}
			</div>
		</div>
	);
};

export default ProductCard;
