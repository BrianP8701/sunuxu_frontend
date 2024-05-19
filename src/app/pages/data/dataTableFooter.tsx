import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CloudDownload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table as TableType
} from "@tanstack/react-table"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogFooter,
    DialogClose,


} from "@/components/ui/dialog";
import { deletePeople, deleteProperty, deleteTransaction } from '@/api/base';
import { refreshTableData } from '@/app/store/dataSlice';

interface DataTableFooterProps {
    current_page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
    set_current_page: any;
    selected_ids?: string[];
    table: TableType<any>
}

export const DataTableFooter: React.FC<DataTableFooterProps> = ({ current_page, page_size, total_items, total_pages, set_current_page, selected_ids, table }) => {
    const dispatch = useDispatch();
    const current_data_table = useSelector((state: RootState) => state.data.current_data_table);

    const [showPaginationFull, setShowPaginationFull] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900) {
                setShowPaginationFull(false);
            } else {
                setShowPaginationFull(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSetPage = (page: number) => {
        dispatch(set_current_page(page));
    }

    const startIndex = (current_page - 1) * page_size + 1;
    const endIndex = Math.min(startIndex + page_size - 1, total_items);

    const getNumberOfSelected = () => {
        return table.getSelectedRowModel().flatRows.length;
    }

    const handleDelete = () => {
        const selected_ids = table.getSelectedRowModel().flatRows.map(row => row.original.id)
        if (selected_ids.length == 0) {
            return;
        } else {
            let payload = null
            console.log("Type of selected_ids:", typeof selected_ids[0]);
            if (selected_ids.length == 1) {
                payload = selected_ids[0]
            } else {
                payload = selected_ids
            }
            payload = { "id": payload }
            console.log("Payload for deletion:", JSON.stringify(payload));

            switch (current_data_table) {
                case "people":
                    deletePeople(payload).then(() => {
                        dispatch(refreshTableData());
                    });
                    break;
                case "properties":
                    deleteProperty(payload).then(() => {
                        dispatch(refreshTableData());
                    });
                    break;
                case "transactions":
                    deleteTransaction(payload).then(() => {
                        dispatch(refreshTableData());
                    });
                    break;
            }
        }
    }

    const paginationItems = [];
    if (showPaginationFull) {
        if (total_pages <= 9) {
            for (let i = 1; i <= total_pages; i++) {
                paginationItems.push(
                    <PaginationItem key={i}>
                        <PaginationLink href="#" className={current_page === i ? "active" : ""} onClick={() => handleSetPage(i)}>{i}</PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            if (current_page > 1) {
                paginationItems.push(
                    <PaginationItem key="prev">
                        <PaginationPrevious href="#" onClick={() => handleSetPage(current_page - 1)} />
                    </PaginationItem>
                );
            }
            paginationItems.push(
                <PaginationItem key="1">
                    <PaginationLink href="#" onClick={() => handleSetPage(1)}>1</PaginationLink>
                </PaginationItem>
            );
            if (current_page > 4) {
                paginationItems.push(<PaginationItem key="ellipsis1"><PaginationEllipsis /></PaginationItem>);
            }
            let pageLowerLimit = Math.max(2, current_page - 1);
            let pageUpperLimit = Math.min(total_pages - 1, current_page + 1);
            for (let i = pageLowerLimit; i <= pageUpperLimit; i++) {
                paginationItems.push(
                    <PaginationItem key={i}>
                        <PaginationLink href="#" className={current_page === i ? "active" : ""} onClick={() => handleSetPage(i)}>{i}</PaginationLink>
                    </PaginationItem>
                );
            }
            if (current_page < total_pages - 3) {
                paginationItems.push(<PaginationItem key="ellipsis2"><PaginationEllipsis /></PaginationItem>);
            }
            paginationItems.push(
                <PaginationItem key={total_pages}>
                    <PaginationLink href="#" onClick={() => handleSetPage(total_pages)}>{total_pages}</PaginationLink>
                </PaginationItem>
            );
            if (current_page < total_pages) {
                paginationItems.push(
                    <PaginationItem key="next">
                        <PaginationNext href="#" onClick={() => handleSetPage(current_page + 1)} />
                    </PaginationItem>
                );
            }
        }
    } else {
        // Minimal pagination for small screens
        if (current_page > 1) {
            paginationItems.push(
                <PaginationItem key="prev">
                    <PaginationPrevious href="#" onClick={() => handleSetPage(current_page - 1)} />
                </PaginationItem>
            );
        }
        paginationItems.push(
            <PaginationItem key={current_page.toString()}>
                <PaginationLink href="#" className="active">{current_page}</PaginationLink>
            </PaginationItem>
        );
        if (current_page < total_pages) {
            paginationItems.push(
                <PaginationItem key="next">
                    <PaginationNext href="#" onClick={() => handleSetPage(current_page + 1)} />
                </PaginationItem>
            );
        }
    }

    return (
        <div className="relative flex items-center mt-4">
            {showPaginationFull && (
                <div className="absolute left-0">
                    <span className="text-s">{startIndex}-{endIndex} of {total_items}</span>
                </div>
            )}
            <div className={`absolute ${showPaginationFull ? 'inset-x-0 justify-center' : 'left-0 justify-start'}`}>
                <Pagination>
                    <PaginationContent>
                        {paginationItems.map(item => (
                            <div key={item.key} className={`rounded-lg ${item.key === current_page.toString() ? 'bg-muted text-primary' : 'text-muted-foreground'}`}>
                                {item}
                            </div>
                        ))}
                    </PaginationContent>
                </Pagination>
            </div>
            <div className="flex-1"></div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-8 h-8 p-0 flex items-center justify-center z-10">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-56">
                    Delete {getNumberOfSelected()} items
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" onClick={handleDelete} >Confirm</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Button variant="outline" className="ml-2 w-28 h-8 p-0 flex items-center justify-center z-10">
                Download
                <CloudDownload className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}
