import { cn } from '@hwei/ui/utils/cn';
import Image from 'next/image';
import Link from 'next/link';
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
		<Link
			href="/products/editor"
			className={cn(
				'flex flex-col gap-2 cursor-pointer flex-shrink w-full max-w-60 h-full',
				className
			)}
		>
			<Image
				src={img}
				alt={title}
				width={200}
				height={200}
				className="rounded-[30px] w-full h-full object-cover object-center hover:shadow-sm transition-all duration-300"
			/>
			<div className="flex flex-col justify-between px-2">
				<h2 className={`text-xl font-medium line-clamp-${clamp} w-full`}>
					{title}
				</h2>
				{children}
			</div>
		</Link>
	);
};

export default ProductCard;
