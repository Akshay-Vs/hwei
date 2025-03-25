import { Button } from '@hwei/ui/shadcn/button';
import { cn } from '@hwei/ui/utils/cn';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import AddVariantItem from './add-variant-item';

const variants = [
  {
    id: '1DS3H',
    src: 'https://23ujkrayxy.ufs.sh/f/u628d5y0J6C1QjE9DBYwRG3i8a6KDvpXeBrV5mTsj9AbuIOo',
    label: 'White',
  },
  {
    id: '78OYH',
    src: 'https://23ujkrayxy.ufs.sh/f/u628d5y0J6C1QjE9DBYwRG3i8a6KDvpXeBrV5mTsj9AbuIOo',
    label: 'Blue',
  },
  {
    id: '7GUYA',
    src: 'https://23ujkrayxy.ufs.sh/f/u628d5y0J6C1QjE9DBYwRG3i8a6KDvpXeBrV5mTsj9AbuIOo',
    label: 'Black',
  },
];


const VariantItems = () => {
  return (
    <div className="flex gap-2 full items-start h-16">
    {variants.map((variant) => (
      <div
        className="h-full w-16 col-center gap-2 cursor-pointer"
        key={variant.id}
      >
        <Image
          width={220}
          height={220}
          src={variant.src}
          alt={variant.label}
          className={cn(
            'full object-center object-cover rounded-2xl !h-14 !w-14 aspect-square border-2 transition-colors duration-300 border-secondary/50'
          )}
        />
        <p className="text-sm text-center">{variant.label}</p>
      </div>
    ))}

    <AddVariantItem />
  </div>
  )
}

export default VariantItems