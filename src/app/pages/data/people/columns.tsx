"use client"

import * as React from "react"

import {
    ColumnDef
} from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

export type PersonRow = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const PeopleTableColumns: ColumnDef<PersonRow>[] = [{
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
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
]
