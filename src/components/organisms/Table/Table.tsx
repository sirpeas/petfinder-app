import { ArrowUp, ArrowDown } from '@phosphor-icons/react/dist/ssr';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { Props, Column } from './types';
import clsx from 'clsx';

export const Table = <T extends object>(props: Props<T>) => {
  const { columns, data, isLocalSortingEnabled, onRowClick } = props;
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns: columns.map((col: Column) => ({
      accessorKey: col.key,
      header: col.label,
    })),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <table className="w-full">
      <thead className="bg-white">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="">
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="p-2 text-left">
                <div className="flex items-center gap-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {isLocalSortingEnabled ? (
                    <button
                      className="flex flex-row w-6 cursor-pointer"
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {!header.column.getIsSorted() ? (
                        <>
                          <ArrowUp size={14} />
                          <ArrowDown size={14} />
                        </>
                      ) : null}
                      {header.column.getIsSorted() === 'asc' && <ArrowUp size={14} />}
                      {header.column.getIsSorted() === 'desc' && <ArrowDown size={14} />}
                    </button>
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={clsx('bg-white transition cursor-pointer even:bg-gray-50', onRowClick && 'hover:bg-gray-100')}
            onClick={() => onRowClick?.(row.original)}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-2 text-md">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
