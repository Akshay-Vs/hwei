import { useFormContext } from 'react-hook-form';

interface ProductFormValues {
  brand: string;
  category: string;
}

const PreviewCategory: React.FC = () => {
  const { watch, formState: { errors } } = useFormContext<ProductFormValues>();

  const brand = watch('brand');
  const category = watch('category');

  const displayBrand = brand?.trim() || 'Brand';
  const displayCategory = category?.trim() || 'Category';

	if (errors.brand || errors.category) {
		return (
			<p className="text-lg text-destructive">
				{errors.brand?.message || errors.category?.message}
			</p>
		);
	}

  return (
    <p 
      className="text-lg text-secondary/60 cursor-pointer"
      title={`${displayBrand} / ${displayCategory}`}
    >
      {displayBrand} / {displayCategory}
    </p>
  );
};

export default PreviewCategory;