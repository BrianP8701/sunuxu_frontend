"use client"

import * as React from "react"

import {
    ColumnDef
} from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

export type Property = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const propertiesTableColumns: ColumnDef<Property>[] = [{
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
            className="z-1000"
        />
    ),
    enableSorting: false,
    enableHiding: false,
},
{
    accessorKey: "address",
    header: "Address",
    size: 30,
    maxSize: 30,
    cell: ({ row }) => (
        <div className="capitalize">{row.getValue("address")}</div>
    ),
},
{
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
        <div className="capitalize">
            {(row.getValue("status") as string).split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </div>
    ),
},
{
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
        <div className="capitalize">
            {(row.getValue("type") as string).split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </div>
    ),
},
{
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"))

        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price)

        return <div className="text-right font-medium">{formatted}</div>
    },
}
]

