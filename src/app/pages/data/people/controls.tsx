"use client"

import * as React from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    setIncludePeopleTableStatuses,
    setIncludePeopleTableTypes, setPeopleSortBy,
    setPeopleSortDirection, setPeoplePageSize
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

import AddPersonDialogContent from "./add";

export default function PeopleTableControls() {
    const include_people_types: { [key: string]: boolean } = useSelector((state: any) => state.data.include_people_types);
    const include_people_statuses: { [key: string]: boolean } = useSelector((state: any) => state.data.include_people_statuses);
    const include_people_columns: { [key: string]: boolean } = useSelector((state: any) => state.data.include_people_columns);
    const people_table_sort: string = useSelector((state: any) => state.data.people_sort_by);
    const people_table_sort_direction: string = useSelector((state: any) => state.data.people_sort_direction);
    const people_table_page_size: number = useSelector((state: any) => state.data.people_page_size);

    const [includeAllTypes, setIncludeAllTypes] = React.useState<boolean>(false);
    const [includeAllStatuses, setIncludeAllStatuses] = React.useState<boolean>(false);
    const [includeAllColumns, setIncludeAllColumns] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>("");

    const dispatch = useDispatch();

    const handleIncludePeopleTypes = (key: string) => {
        const updatedFilters = {
            ...include_people_types,
            [key]: !include_people_types[key]
        };
        dispatch(setIncludePeopleTableTypes(updatedFilters));
    };

    const handleIncludePeopleStatuses = (key: string) => {
        const updatedFilters = {
            ...include_people_statuses,
            [key]: !include_people_statuses[key]
        };
        dispatch(setIncludePeopleTableStatuses(updatedFilters));
    };

    // const handleIncludePeopleColumns = (key: string) => {
    //     const updatedFilters = {
    //         ...include_people_columns,
    //         [key]: !include_people_columns[key]
    //     };
    //     dispatch(setIncludePeopleTableColumns(updatedFilters));
    // }

    const handleIncludeAllTypes = () => {
        setIncludeAllTypes(!includeAllTypes)
        const updatedFilters = Object.fromEntries(Object.keys(include_people_types).map(key => [key, !includeAllTypes]))
        dispatch(setIncludePeopleTableTypes(updatedFilters));
    };

    const handleIncludeAllStatuses = () => {
        setIncludeAllStatuses(!includeAllStatuses)
        const updatedFilters = Object.fromEntries(Object.keys(include_people_statuses).map(key => [key, !includeAllStatuses]))
        dispatch(setIncludePeopleTableStatuses(updatedFilters));
    };

    // const handleIncludeAllColumns = () => {
    //     setIncludeAllColumns(!includeAllColumns)
    //     const updatedFilters = Object.fromEntries(Object.keys(include_people_columns).map(key => [key, !includeAllColumns]))
    //     dispatch(setIncludePeopleTableColumns(updatedFilters));
    // };

    const handleSearch = () => {

    }

    return (
        <div className="">
            <div className="flex items-center">
                <Input
                    placeholder="Search by name, number or email"
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
                            <AddPersonDialogContent />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="flex items-center py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="">
                            Page size: {people_table_page_size === 1000000 ? "Max" : people_table_page_size}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuRadioGroup value={people_table_page_size.toString()} onValueChange={(value) => dispatch(setPeoplePageSize(Number(value)))}>
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
                            {Object.entries(include_People_columns).map(([key, value]) => (
                                <DropdownMenuCheckboxItem
                                    key={key}
                                    className="capitalize"
                                    checked={value}
                                    onCheckedChange={() => handleIncludePeopleColumns(key)}
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
                        {Object.entries(include_people_types).map(([key, value]) => (
                            <DropdownMenuCheckboxItem
                                key={key}
                                className="capitalize"
                                checked={value}
                                onCheckedChange={() => handleIncludePeopleTypes(key)}
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
                        {Object.entries(include_people_statuses).map(([key, value]) => (
                            <DropdownMenuCheckboxItem
                                key={key}
                                className="capitalize"
                                checked={value}
                                onCheckedChange={() => handleIncludePeopleStatuses(key)}
                            >
                                {key}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-4 button-hide-4">
                            Sort by: {people_table_sort.charAt(0).toUpperCase() + people_table_sort.slice(1)}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuRadioGroup value={people_table_sort} onValueChange={(value) => dispatch(setPeopleSortBy(value as "viewed" | "created" | "updated"))}>
                            <DropdownMenuRadioItem value="viewed">Viewed</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="updated">Updated</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="created">Created</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-4 button-hide-3">
                            Sort order: {people_table_sort_direction === "new" ? "New" : "Old"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuRadioGroup value={people_table_sort_direction} onValueChange={(value) => dispatch(setPeopleSortDirection(value as "new" | "old"))}>
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
                            <AddPersonDialogContent />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
