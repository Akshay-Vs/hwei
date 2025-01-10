'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@hwei/ui/shadcn/button';
import { Input } from '@hwei/ui/shadcn/input';
import useDebouncedSearch from '@/hooks/use-debounce';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@hwei/ui/shadcn/form';

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@hwei/ui/shadcn/tooltip';

interface SearchInputProps {
	onSearch: (query: string) => void;
}

const FormSchema = z.object({
	query: z.string(),
});

const SearchInput = ({ onSearch }: SearchInputProps) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			query: '',
		},
	});

	const query = form.watch('query');

	useDebouncedSearch({ onSearch, query });

	return (
		<Form {...form}>
			<form className="py-2 pl-6 pr-2 flex items-center justify-between border-2 w-72 h-fit border-stroke/80 rounded-base">
				<FormField
					control={form.control}
					name="query"
					render={({ field }) => (
						<FormItem className="space-y-0">
							<FormLabel className="sr-only">Search</FormLabel>
							<FormControl>
								<Input
									placeholder="Search..."
									className="w-full placeholder:text-xl !text-secondary !text-xl px-0"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							className="hover:bg-transparent"
							onClick={(e) => {
								e.preventDefault();
								onSearch(query);
							}}
						>
							<Search className="w-6 h-6 text-xl text-stroke" strokeWidth={2} />
						</Button>
					</TooltipTrigger>

					<TooltipContent>
						<p className="text-sm font-semibold">Refresh</p>
					</TooltipContent>
				</Tooltip>
			</form>
		</Form>
	);
};

export default SearchInput;
