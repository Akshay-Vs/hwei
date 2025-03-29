import { CheckCircle, CircleX } from 'lucide-react';
import React from 'react';

const FormSuccess = ({ message }: { message?: string }) => {
	return (
		<div className="w-full py-2 px-4 rounded-2xl flex items-center gap-2 text-center text-sm font-medium font-sans bg-emerald-100 text-emerald-800">
			<CheckCircle className="h-4 w-4" />
			{message}
		</div>
	);
};
const FormError = ({ message }: { message?: string }) => {
	return (
		<div className="w-full py-2 px-4 rounded-2xl flex items-center gap-2 text-center text-sm font-medium font-sans bg-red-100 text-red-800">
			<CircleX className="h-4 w-4 mb-[1px]" />
			{message}
		</div>
	);
};
export { FormSuccess, FormError };
