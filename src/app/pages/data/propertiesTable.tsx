"use client"

import * as React from "react"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPropertiesTableFilters, setPropertiesTableSort, setPropertiesTableSortDirection, setPropertiesTablePageSize } from '@/app/store/appSlice';
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
    PlusIcon,
} from "@radix-ui/react-icons"
import { ListFilter, CloudDownload } from "lucide-react"
import {
    ColumnDef
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"

export type Property = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const propertiesTableColumns: ColumnDef<Property>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function PropertiesTableControls() {
    const [searchPropertyValue, setSearchPropertyValue] = React.useState("")
    const properties_table_filters: { [key: string]: boolean } = useSelector((state: any) => state.app.properties_table_filters)
    const properties_table_sort: string = useSelector((state: any) => state.app.properties_table_sort)
    const properties_table_sort_direction: string = useSelector((state: any) => state.app.properties_table_sort_direction)
    const properties_table_page_size: number = useSelector((state: any) => state.app.properties_table_page_size)
    const dispatch = useDispatch();

    const handleFilterUpdate = (key: string) => {
        const updatedFilters = {
            ...properties_table_filters,
            [key]: !properties_table_filters[key]
        };
        dispatch(setPropertiesTableFilters(updatedFilters));
    }

    return (
        <div className="flex items-center py-4">
            <Input
                placeholder="Search properties..."
                value={searchPropertyValue}
                onChange={(event) =>
                    setSearchPropertyValue(event.target.value)
                }
                className="max-w-sm mr-4"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Page size: {properties_table_page_size === 1000000 ? "Max" : properties_table_page_size}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value={properties_table_page_size.toString()} onValueChange={(value) => dispatch(setPropertiesTablePageSize(Number(value)))}>
                        <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="20">20</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="100">100</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="250">250</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="1000000">Max</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-4">
                        Sort By: {properties_table_sort.charAt(0).toUpperCase() + properties_table_sort.slice(1)}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value={properties_table_sort} onValueChange={(value) => dispatch(setPropertiesTableSort(value))}>
                        <DropdownMenuRadioItem value="viewed">Viewed</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="updated">Updated</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="created">Created</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-4">
                        Sort order: {properties_table_sort_direction === "asc" ? "Ascending" : "Descending"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value={properties_table_sort_direction} onValueChange={(value) => dispatch(setPropertiesTableSortDirection(value as "asc" | "desc"))}>
                        <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-4">
                        <ListFilter className="mr-2 h-4 w-4" /> Include
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {Object.entries(properties_table_filters).map(([key, value]) => (
                        <DropdownMenuCheckboxItem
                            key={key}
                            className="capitalize"
                            checked={value}
                            onCheckedChange={() => handleFilterUpdate(key)}
                        >
                            {key}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="ml-4 w-8 h-8 p-0 flex items-center justify-center">
                <PlusIcon className="h-6 w-6" />
            </Button>
        </div>
    )
}

export function PropertiesTableFooter() {
    return (
        <div className="relative flex items-center mt-4">
            <div className="absolute inset-x-0 flex justify-center">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">9</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            <div className="flex-1"></div>
            <Button variant="outline" className="w-36 h-8 p-0 flex items-center justify-center z-10">
                Download Data
                <CloudDownload className="ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}
