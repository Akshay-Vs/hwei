import { Card } from '@hwei/ui/shadcn/card';
import Image from 'next/image';
import React from 'react';
import PreviewProductImages from './preview-product-images';
import { Separator } from '@hwei/ui/shadcn/separator';
import { Truck } from 'lucide-react';

const EditorPreview = () => {
	return (
		<div className="flex flex-col gap-6 h-[56rem] w-3/5 sticky top-32">
			<Card className="h-full w-full gap-4 flex flex-col">
				<PreviewProductImages />

				<div className="mt-4 col gap-4">
					<p className="text-lg text-secondary/60">Shoes collection</p>
					<h1 className="text-3xl font-medium line-clamp-3">
						Running Shoes for Men & Women
					</h1>

					<div className="flex items-center gap-2 text-secondary/60">
						<Truck className="w-4 h-4" />
						<p className="text-sm ">Free Shipping above $100</p>
					</div>

					<div className="flex items-center gap-2">
						<p className="text-2xl font-medium">$100.00</p>
						<span className="text-lg text-secondary/60 line-through">
							$150.00
						</span>
						<span className="text-sm text-secondary/60">50% off</span>
						<span className="text-sm text-secondary/60">In Stock</span>
					</div>

					<Separator className="opacity-20" />

					<p className="text-lg text-secondary/60">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
						expedita aut repudiandae sed delectus tempore voluptates ea odit
						ullam, omnis tenetur qui quaerat natus explicabo, repellat officiis!
						Id modi magnam eveniet quaerat?
					</p>
				</div>
			</Card>
		</div>
	);
};

export default EditorPreview;
