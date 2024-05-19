"use client"
/* 
What do i want for the table?
I want search by the primary columns
I want to be able to sort by any date, or number column. really i want to be able to sort by any column
I want to be able to filter any columns that have a limited set of values
I want to be able to filter by ranges for any date or number columns
I want to be able to select rows
I want to be able to adjust column widths
I want to be able to choose which columns are visible
Select page size and pagination
I want the header row to be sticky
I want the table to be responsive
I want to be able to scroll in all directions
I want a loading icon
I want a no results message
export/import data
save/resue/delete table views

So we have the following types of columns:
- select columns
- number/date columns
- text columns
- limited set of values columns

*/
import {
  flexRender,
  Table as TableType
} from "@tanstack/react-table"
import { ThreeDots } from 'react-loader-spinner';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DataTableProps<TData extends { id: string | number }> {
  table: TableType<TData>
  isLoading?: boolean
  setSelectedIds?: (ids: string[]) => void
}

export function TableWindow<TData extends { id: string | number }, TValue>({ table, isLoading, setSelectedIds }: DataTableProps<TData>) {
  return (
    <div className="rounded-md border" style={{ height: `calc(100vh - 300px)`, overflow: 'hidden' }}>
      <ScrollArea style={{ height: '100%', overflowX: 'auto' }}>
        <Table>
          <TableHeader className="sticky top-0 bg-card"
            style={{ position: 'sticky', top: 0, zIndex: 100 }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : <div
                        style={{ display: 'flex', alignItems: 'center' }}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    }
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody >
            {
              isLoading ? (
                <TableRow>
                  <TableCell colSpan={table.getAllColumns().length} style={{ textAlign: 'center' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      height: '100px',
                    }}>
                      <ThreeDots height={80} width={80} color="currentColor" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <Dialog key={row.id}>
                      <DialogTrigger asChild>
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                          style={{ cursor: 'pointer' }}  // Indicates the row is clickable
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}                              >
                              {/* Stop propagation for specific interactive elements */}
                              {cell.column.id === 'select' || cell.column.id === 'actions' ? (
                                <div
                                  onMouseDown={(e) => e.stopPropagation()}
                                  onMouseUp={(e) => e.stopPropagation()}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </div>
                              ) : (
                                flexRender(cell.column.columnDef.cell, cell.getContext())
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      </DialogTrigger>
                      <DialogContent>
                        {row.getVisibleCells().map(cell => (
                          <div key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        ))}
                        SOMETHING
                        <div>ID: {row.original.id}</div>
                      </DialogContent>
                    </Dialog>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={table.getAllColumns().length} className="h-full text-center">
                      No results
                    </TableCell>
                  </TableRow>
                )
              )
            }
          </TableBody>
        </Table>
      </ScrollArea>
    </div >
  )
}
