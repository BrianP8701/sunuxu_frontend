import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CloudDownload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTableFooterProps {
    current_page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
    set_current_page: any;
}

export const DataTableFooter: React.FC<DataTableFooterProps> = ({ current_page, page_size, total_items, total_pages, set_current_page }) => {
    console.log("Current Page: ", current_page, "Page size:", page_size, "total items", total_items, "total_pages", total_pages);
    const dispatch = useDispatch();

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
            <Button variant="outline" className="w-8 h-8 p-0 flex items-center justify-center z-10">
                <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="ml-2 w-28 h-8 p-0 flex items-center justify-center z-10">
                Download
                <CloudDownload className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}
