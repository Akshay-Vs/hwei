import React from 'react';
import Image from 'next/image';
import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from '@hwei/ui/shadcn/form';

import { UploadDropzone } from '@/utils/uploadthing/uploadting';
import { useVarientItem } from '../../hooks/use-varient-item';

const ImageInput = () => {
	const { varientItemModelForm: form, loading } = useVarientItem();

	return (
		<>
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
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			{form.watch('image') && (
				<Image
					src={form.watch('image')}
					alt="Variant item image"
					width={100}
					height={100}
				/>
			)}
		</>
	);
};

export default ImageInput;
