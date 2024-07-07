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
} from "@tanstack/react-table";
import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";
import Paginator from "./paginator";
import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";

export interface DataTableProps {
  data: any[];
  columns: ColumnDef<any, any>[];
}

export default function DataTable({ data, columns }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
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

  const isLastColumn = (index: number) => index === columns.length - 1;

  return (
    <>
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    const isSortable = !isLastColumn(index);

                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            {...(isSortable && {
                              onClick: header.column.getToggleSortingHandler(),
                              style: { cursor: "pointer" },
                            })}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {isSortable && header.column.getIsSorted() ? (
                              header.column.getIsSorted() === "asc" ? (
                                <ArrowUp className="inline-block ml-2" size={16} />
                              ) : (
                                <ArrowDown className="inline-block ml-2" size={16} />
                              )
                            ) : (
                              isSortable && <ChevronsUpDown className="inline-block ml-2" size={16} />
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
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
