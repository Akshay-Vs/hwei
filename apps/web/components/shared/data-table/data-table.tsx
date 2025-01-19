'use client';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	ColumnFiltersState,
	getFilteredRowModel,
	PaginationState,
	getSortedRowModel,
	SortingState,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from './table';
import { useState } from 'react';
import SelectorButton from '../button/selector-button';
import { cn } from '@hwei/ui/utils/cn';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 6,
	});

	const table = useReactTable({
		data,
		columns,
		onColumnFiltersChange: setColumnFilters,
		onPaginationChange: setPagination,
		getFilteredRowModel: getFilteredRowModel(),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			columnFilters,
			pagination,
			sorting,
		},
	});

	return (
		<div className="full p-4 rounded-base border-2 border-border min-h-[50vh]">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className="text-md">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-64 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>

				<TableFooter
					className={cn(
						'border-accent bg-transparent',
						table.getRowModel().rows.length ===
							table.getFilteredRowModel().rows.length
							? 'hidden'
							: ''
					)}
				>
					<TableRow>
						<TableCell colSpan={columns.length}>
							<div className="flex justify-between items-center">
								<div className="text-sm text-muted-foreground">
									Showing{' '}
									<span className="font-medium">
										{table.getRowModel().rows.length}
									</span>{' '}
									of{' '}
									<span className="font-medium">
										{table.getFilteredRowModel().rows.length}
									</span>{' '}
									results
								</div>
								<div className="flex gap-4">
									<SelectorButton
										onClick={() => table.previousPage()}
										disabled={!table.getCanPreviousPage()}
									>
										Previous
									</SelectorButton>
									<SelectorButton
										onClick={() => table.nextPage()}
										disabled={!table.getCanNextPage()}
									>
										Next
									</SelectorButton>
								</div>
							</div>
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
