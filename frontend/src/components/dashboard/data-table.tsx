"use client";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Paginator from "./paginator";
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";

export interface DataTableProps {
  data: any[];
  columns: Array<ColumnDef<any> & { sortable?: boolean }>;
  defaultSort?: SortingState;
}

export default function DataTable({ data, columns, defaultSort = [] }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>(defaultSort);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="w-full">
        <div className="rounded-md border">
          <Table className="min-w-[640px]">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const isSortable = header.column.columnDef.sortable !== false;

                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            {...(isSortable && {
                              onClick: header.column.getToggleSortingHandler(),
                              className: "flex items-center cursor-pointer whitespace-nowrap",
                            })}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {isSortable && header.column.getIsSorted() ? (
                              header.column.getIsSorted() === "asc" ? (
                                <ArrowUp className="ml-2" size={16} />
                              ) : (
                                <ArrowDown className="ml-2" size={16} />
                              )
                            ) : (
                              isSortable && <ChevronsUpDown className="ml-2" size={16} />
                            )}
                          </div>
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
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="min-w-[130px] max-w-[200px] md:max-w-[500px] overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 flex-auto">
                    <div className="flex justify-center">Sem informações.</div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length
              ? `${table.getFilteredSelectedRowModel().rows.length} de{" "}`
              : null}
            {table.getFilteredRowModel().rows.length} linha(s)
          </div>
          <div className="flex justify-end">
            <Paginator
              currentPage={table.getState().pagination.pageIndex + 1}
              totalPages={table.getPageCount()}
              onPageChange={(pageNumber) => table.setPageIndex(pageNumber - 1)}
              showPreviousNext
            />
          </div>
        </div>
      </div>
    </>
  );
}
