import React, { useState } from 'react';
import Image from 'next/image';
import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from '@hwei/ui/shadcn/form';

import { UploadDropzone } from '@/utils/uploadthing/uploadting';
import { useVarientItem } from '../../hooks/use-varient-item';
import { Button } from '@hwei/ui/shadcn/button';
import { Loader2, Trash2 } from 'lucide-react';

const ImageInput = () => {
	const { varientItemModelForm: form, loading } = useVarientItem();
	const [imageLoading, setImageLoading] = useState(true);

	const onImageLoad = () => {
		setImageLoading(false);
	};

	return (
		<>
			{!form.watch('image') ? (
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<UploadDropzone
									disabled={loading}
									endpoint="productImage"
									onClientUploadComplete={(res) => {
										if (res?.[0]) {
											field.onChange(res[0].ufsUrl);
										}
									}}
									onUploadError={(error: Error) => {
										console.error('Upload error:', error);
										alert(`Upload failed: ${error.message}`);
									}}
									appearance={{
										button:
											'bg-primary text-primary-foreground hover:bg-primary/90 data-[state=disabled]:bg-primary/70 data-[state=ready]:bg-primary data-[state=readying]:bg-primary/70 data-[state=uploading]:bg-secondary/80 after:bg-secondary focus-within:ring-primary rounded-base',
										container: 'rounded-[1rem] h-64 w-full',
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			) : (
				<div className="h-64 w-full rounded-2xl bg-slate-200 relative overflow-hidden">
					<Image
						src={form.watch('image')}
						alt="Variant item image"
						className="full object-contain object-center"
						width={420}
						height={256}
						onLoadingComplete={onImageLoad}
					/>

					<div className="absolute top-5 right-5 z-10">
						<Button
							variant="destructive"
							size="icon"
							onClick={() => form.setValue('image', '')}
						>
							<Trash2 size={20} />
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default ImageInput;
