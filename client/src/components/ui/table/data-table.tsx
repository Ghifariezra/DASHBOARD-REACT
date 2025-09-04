/* eslint-disable @typescript-eslint/no-explicit-any */

import { useProviderHome } from "@/hooks/providers/useProviderHome";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface BaseRow {
	Kabupaten: string;
}

interface DataTableProps<TData extends BaseRow> {
	columns: ColumnDef<TData, any>[];
	data: TData[];
}

export function DataTable<TData extends BaseRow>({
	data,
	columns,
}: DataTableProps<TData>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
    const { handleBarClick } = useProviderHome();

	return (
		<div className="border rounded-2xl overflow-hidden h-full">
			<div className="overflow-y-auto h-96">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="font-bold">
										{" "}
										{/* Hapus w-full di sini */}
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
											  )}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows.length > 0 ? (
							table.getRowModel().rows.map((row, rowIndex) => {
								const kab = row.original.Kabupaten;
								const isFirstRowOfKab =
									rowIndex === 0 ||
									table.getRowModel().rows[rowIndex - 1]
										.original.Kabupaten !== kab;

								const rowSpan = table
									.getRowModel()
									.rows.filter(
										(r) => r.original.Kabupaten === kab
									).length;

								return (
									<TableRow key={row.id}>
										{isFirstRowOfKab && (
											<TableCell
												rowSpan={rowSpan}
												className="text-center font-bold">
												<span
													className="block bg-amber-400 p-2 rounded-md cursor-pointer"
													onClick={() =>
														handleBarClick(kab)
													}>
													{kab}
												</span>
											</TableCell>
										)}
										{row.getVisibleCells().map((cell) => {
											if (cell.column.id === "Kabupaten")
												return null;

											return (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef
															.cell,
														cell.getContext()
													)}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
