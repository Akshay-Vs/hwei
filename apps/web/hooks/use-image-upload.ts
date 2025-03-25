import { deleteFile } from '@/actions/UTApi';
import { Toast } from '@/utils/toast';
import { useCallback, useMemo } from 'react';
import {
	UseFormReturn,
	FieldValues,
	FieldPath,
	PathValue,
} from 'react-hook-form';

export const useImageUpload = <T extends FieldValues>(
	form: UseFormReturn<T>,
	field: FieldPath<T>
) => {
	const image = form.watch(field) as string;

	const setImageError = (message: string) => {
		Toast({
			type: 'error',
			message: message,
		});
	};

	const handleDeleteImage = async () => {
		try {
			if (!image) return;
			const res = await deleteFile(image);

			if (res.success)
				return form.setValue(field, '' as PathValue<T, FieldPath<T>>);

			console.log(res);

			return setImageError('Failed to delete image');
		} catch (error) {
			console.log(error);
			return setImageError('Failed to delete image');
		}
	};

	const onClientUploadComplete = (res: { ufsUrl: string }[]) => {
		form.setValue(field, res?.[0]?.ufsUrl as PathValue<T, FieldPath<T>>);
	};

	const onUploadError = () => {
		setImageError('Failed to upload image');
	};

	return useMemo(
		() => ({ image, handleDeleteImage, onClientUploadComplete, onUploadError }),
		[image, handleDeleteImage, onClientUploadComplete, onUploadError]
	);
};
