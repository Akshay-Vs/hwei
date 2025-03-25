import React from 'react';
import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
} from '@hwei/ui/shadcn/form';

import ImageUploadDropzone from '@/components/shared/image-upload/image-upload-dropzone';
import UploadPreview from '@/components/shared/image-upload/upload-preview';
import { useImageUpload } from '../../../../../hooks/use-image-upload';
import { useFormContext } from 'react-hook-form';
import { TBaseLoading } from '@/types/base-props';

const ImageInput = ({ loading }: TBaseLoading) => {
	const form = useFormContext();
	const { handleDeleteImage, onClientUploadComplete, onUploadError, image } =
		useImageUpload(form, 'image');

	return (
		<>
			{image ? (
				<UploadPreview handleDeleteImage={handleDeleteImage} image={image} />
			) : (
				<FormField
					control={form.control}
					name="image"
					render={() => (
						<FormItem>
							<FormControl>
								<ImageUploadDropzone
									onClientUploadComplete={onClientUploadComplete}
									onUploadError={onUploadError}
									loading={loading}
									{...form}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}
		</>
	);
};

export default ImageInput;
