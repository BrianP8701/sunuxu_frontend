"use client"

import * as React from "react"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIncludeTransactionsTableStatuses, setIncludeTransactionsTableTypes, setTransactionsSortBy, setTransactionsSortDirection, setTransactionsPageSize } from '@/app/store/appSlice';
import { PlusIcon } from "@radix-ui/react-icons"
import { ListFilter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import AddTransactionDialogContent from "./add";

export default function TransactionsTableControls() {
    const include_transactions_table_types: { [key: string]: boolean } = useSelector((state: any) => state.app.include_transactions_types)
    const include_transactions_table_statuses: { [key: string]: boolean } = useSelector((state: any) => state.app.include_transactions_statuses)
    const transactions_table_sort: string = useSelector((state: any) => state.app.transactions_sort_by)
    const transactions_table_sort_direction: string = useSelector((state: any) => state.app.transactions_sort_direction)
    const transactions_table_page_size: number = useSelector((state: any) => state.app.transactions_page_size)

    const [includeAllTypes, setIncludeAllTypes] = React.useState<boolean>(false)
    const [includeAllStatuses, setIncludeAllStatuses] = React.useState<boolean>(false)

    const dispatch = useDispatch();

    const handleIncludeTransactionsTypes = (key: string) => {
        const updatedFilters = {
            ...include_transactions_table_types,
            [key]: !include_transactions_table_types[key]
        };
        dispatch(setIncludeTransactionsTableTypes(updatedFilters));
    }

    const handleIncludeTransactionsStatuses = (key: string) => {
        const updatedFilters = {
            ...include_transactions_table_statuses,
            [key]: !include_transactions_table_statuses[key]
        };
        dispatch(setIncludeTransactionsTableStatuses(updatedFilters));
    }

    const handleIncludeAllTypes = () => {
        setIncludeAllTypes(!includeAllTypes)
        const updatedFilters = Object.fromEntries(Object.keys(include_transactions_table_types).map(key => [key, !includeAllTypes]))
        dispatch(setIncludeTransactionsTableTypes(updatedFilters));
    }

    const handleIncludeAllStatuses = () => {
        setIncludeAllStatuses(!includeAllStatuses)
        const updatedFilters = Object.fromEntries(Object.keys(include_transactions_table_statuses).map(key => [key, !includeAllStatuses]))
        dispatch(setIncludeTransactionsTableStatuses(updatedFilters));
    }

    return (
        <div className="flex items-center py-4">
            <Button variant="outline" className="">
                <Search className="mr-3 h-4 w-4" /> Search
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-4">
                        Page size: {transactions_table_page_size === 1000000 ? "Max" : transactions_table_page_size}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value={transactions_table_page_size.toString()} onValueChange={(value) => dispatch(setTransactionsPageSize(Number(value)))}>
                        <DropdownMenuRadioItem value="15">15</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="30">30</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="100">100</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="250">250</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="1000000">Max</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-4 button-hide-4">
                        Sort by: {transactions_table_sort.charAt(0).toUpperCase() + transactions_table_sort.slice(1)}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value={transactions_table_sort} onValueChange={(value) => dispatch(setTransactionsSortBy(value as "viewed" | "created" | "updated"))}>
                        <DropdownMenuRadioItem value="viewed">Viewed</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="updated">Updated</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="created">Created</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-4 button-hide-3">
                        Sort order: {transactions_table_sort_direction === "new" ? "New" : "Old"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value={transactions_table_sort_direction} onValueChange={(value) => dispatch(setTransactionsSortDirection(value as "new" | "old"))}>
                        <DropdownMenuRadioItem value="new">New</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="old">Old</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-4 button-hide-2">
                        <ListFilter className="mr-2 h-4 w-4" /> Type
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                        className="capitalize"
                        checked={includeAllTypes}
                        onCheckedChange={() => handleIncludeAllTypes()}
                    >
                        All
                    </DropdownMenuCheckboxItem>
                    {Object.entries(include_transactions_table_types).map(([key, value]) => (
                        <DropdownMenuCheckboxItem
                            key={key}
                            className="capitalize"
                            checked={value}
                            onCheckedChange={() => handleIncludeTransactionsTypes(key)}
                        >
                            {key}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-4 button-hide-1">
                        <ListFilter className="mr-2 h-4 w-4" /> Status
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                        className="capitalize"
                        checked={includeAllStatuses}
                        onCheckedChange={() => handleIncludeAllStatuses()}
                    >
                        All
                    </DropdownMenuCheckboxItem>
                    {Object.entries(include_transactions_table_statuses).map(([key, value]) => (
                        <DropdownMenuCheckboxItem
                            key={key}
                            className="capitalize"
                            checked={value}
                            onCheckedChange={() => handleIncludeTransactionsStatuses(key)}
                        >
                            {key}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="ml-auto">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-8 h-8 p-0 flex items-center justify-center">
                            <PlusIcon className="h-6 w-8" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <AddTransactionDialogContent />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
