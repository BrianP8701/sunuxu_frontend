"use client"

import * as React from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    setIncludePropertiesTableStatuses,
    setIncludePropertiesTableTypes, setPropertiesSortBy,
    setPropertiesSortDirection, setPropertiesPageSize,
    setIncludePropertiesTableColumns
} from '@/app/store/dataSlice';
import { PlusIcon } from "@radix-ui/react-icons";
import { ListFilter, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";

import AddPropertyDialogContent from "./add";

export default function PropertiesTableControls() {
    const include_properties_types: { [key: string]: boolean } = useSelector((state: any) => state.data.include_properties_types);
    const include_properties_statuses: { [key: string]: boolean } = useSelector((state: any) => state.data.include_properties_statuses);
    const include_properties_columns: { [key: string]: boolean } = useSelector((state: any) => state.data.include_properties_columns);
    const properties_table_sort: string = useSelector((state: any) => state.data.properties_sort_by);
    const properties_table_sort_direction: string = useSelector((state: any) => state.data.properties_sort_direction);
    const properties_table_page_size: number = useSelector((state: any) => state.data.properties_page_size);

    const [includeAllTypes, setIncludeAllTypes] = React.useState<boolean>(false);
    const [includeAllStatuses, setIncludeAllStatuses] = React.useState<boolean>(false);
    const [includeAllColumns, setIncludeAllColumns] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>("");

    const dispatch = useDispatch();

    const handleIncludePropertiesTypes = (key: string) => {
        const updatedFilters = {
            ...include_properties_types,
            [key]: !include_properties_types[key]
        };
        dispatch(setIncludePropertiesTableTypes(updatedFilters));
    };

    const handleIncludePropertiesStatuses = (key: string) => {
        const updatedFilters = {
            ...include_properties_statuses,
            [key]: !include_properties_statuses[key]
        };
        dispatch(setIncludePropertiesTableStatuses(updatedFilters));
    };

    const handleIncludePropertiesColumns = (key: string) => {
        const updatedFilters = {
            ...include_properties_columns,
            [key]: !include_properties_columns[key]
        };
        dispatch(setIncludePropertiesTableColumns(updatedFilters));
    }

    const handleIncludeAllTypes = () => {
        setIncludeAllTypes(!includeAllTypes)
        const updatedFilters = Object.fromEntries(Object.keys(include_properties_types).map(key => [key, !includeAllTypes]))
        dispatch(setIncludePropertiesTableTypes(updatedFilters));
    };

    const handleIncludeAllStatuses = () => {
        setIncludeAllStatuses(!includeAllStatuses)
        const updatedFilters = Object.fromEntries(Object.keys(include_properties_statuses).map(key => [key, !includeAllStatuses]))
        dispatch(setIncludePropertiesTableStatuses(updatedFilters));
    };

    const handleIncludeAllColumns = () => {
        setIncludeAllColumns(!includeAllColumns)
        const updatedFilters = Object.fromEntries(Object.keys(include_properties_columns).map(key => [key, !includeAllColumns]))
        dispatch(setIncludePropertiesTableColumns(updatedFilters));
    };

    const handleSearch = () => {

    }

    return (
        <div className="">
            <div className="flex items-center">
                <Input
                    placeholder="Search by address, owner or MLS ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    className="max-w-sm"
                />
                <div className="ml-auto">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="ml-2 w-28 h-8 p-0 flex items-center justify-center z-10">
                                <Filter className="h-4 w-4 mr-1" /> Advanced
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <AddPropertyDialogContent />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="flex items-center py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="">
                            Page size: {properties_table_page_size === 1000000 ? "Max" : properties_table_page_size}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuRadioGroup value={properties_table_page_size.toString()} onValueChange={(value) => dispatch(setPropertiesPageSize(Number(value)))}>
                            <DropdownMenuRadioItem value="15">15</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="30">30</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="100">100</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="250">250</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="1000000">Max</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-4">
                            <ListFilter className="mr-2 h-4 w-4" /> Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <ScrollArea style={{ height: `calc(100vh - 500px)`, minHeight: '400px' }}>

                            <DropdownMenuCheckboxItem
                                className="capitalize"
                                checked={includeAllColumns}
                                onCheckedChange={() => handleIncludeAllColumns()}
                            >
                                All
                            </DropdownMenuCheckboxItem>
                            {Object.entries(include_properties_columns).map(([key, value]) => (
                                <DropdownMenuCheckboxItem
                                    key={key}
                                    className="capitalize"
                                    checked={value}
                                    onCheckedChange={() => handleIncludePropertiesColumns(key)}
                                >
                                    {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </ScrollArea>
                    </DropdownMenuContent>
                </DropdownMenu> */}
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
                        {Object.entries(include_properties_types).map(([key, value]) => (
                            <DropdownMenuCheckboxItem
                                key={key}
                                className="capitalize"
                                checked={value}
                                onCheckedChange={() => handleIncludePropertiesTypes(key)}
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
                        {Object.entries(include_properties_statuses).map(([key, value]) => (
                            <DropdownMenuCheckboxItem
                                key={key}
                                className="capitalize"
                                checked={value}
                                onCheckedChange={() => handleIncludePropertiesStatuses(key)}
                            >
                                {key}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-4 button-hide-4">
                            Sort by: {properties_table_sort.charAt(0).toUpperCase() + properties_table_sort.slice(1)}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuRadioGroup value={properties_table_sort} onValueChange={(value) => dispatch(setPropertiesSortBy(value as "viewed" | "created" | "updated"))}>
                            <DropdownMenuRadioItem value="viewed">Viewed</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="updated">Updated</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="created">Created</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-4 button-hide-3">
                            Sort order: {properties_table_sort_direction === "new" ? "New" : "Old"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuRadioGroup value={properties_table_sort_direction} onValueChange={(value) => dispatch(setPropertiesSortDirection(value as "new" | "old"))}>
                            <DropdownMenuRadioItem value="new">New</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="old">Old</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
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
                            <AddPropertyDialogContent />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
