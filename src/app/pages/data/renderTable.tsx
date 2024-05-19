import React, { useState, useEffect, useMemo } from 'react';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table"

import { TableWindow } from "./tableWindow";
import { DataTableFooter } from './dataTableFooter';
import PropertiesTableControls from './properties/controls';
import PeopleTableControls from './people/controls';
import TransactionsTableControls from './transactions/controls';
import { PeopleTableColumns } from './people/columns';
import { propertiesTableColumns } from './properties/columns';
import { TransactionsTableColumns } from './transactions/columns';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

import { useFetchDataEffect } from '@/app/pages/data/useFetchDataEffect';

import { setPropertiesCurrentPage, setPeopleCurrentPage, setTransactionsCurrentPage } from '@/app/store/dataSlice';

const RenderTab: React.FC = () => {
    const current_data_table = useSelector((state: RootState) => state.data.current_data_table);

    const properties_page_size = useSelector((state: RootState) => state.data.properties_page_size);
    const properties_current_page = useSelector((state: RootState) => state.data.properties_current_page);
    const properties_total_items = useSelector((state: RootState) => state.data.properties_total_items);
    const properties_total_pages = useSelector((state: RootState) => state.data.properties_total_pages);

    const people_page_size = useSelector((state: RootState) => state.data.people_page_size);
    const people_table_current_page = useSelector((state: RootState) => state.data.people_current_page);
    const people_total_items = useSelector((state: RootState) => state.data.people_total_items);
    const people_total_pages = useSelector((state: RootState) => state.data.people_total_pages);

    const transactions_page_size = useSelector((state: RootState) => state.data.transactions_page_size);
    const transactions_current_page = useSelector((state: RootState) => state.data.transactions_current_page);
    const transactions_total_items = useSelector((state: RootState) => state.data.transactions_total_items);
    const transactions_total_pages = useSelector((state: RootState) => state.data.transactions_total_pages);

    const [data, setData] = useState(null);
    const [rowSelection, setRowSelection] = useState({})
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [isLoading, setIsLoading] = useState(false);
    const [fallbackData, setFallbackData] = useState([]);

    useEffect(() => {
        console.log(isLoading);
    }, [isLoading]);

    const columns = {
        people: PeopleTableColumns,
        properties: propertiesTableColumns,
        transactions: TransactionsTableColumns
    };

    const table = useReactTable({
        data: data || fallbackData,
        columns: columns[current_data_table] || fallbackData,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        columnResizeMode: 'onChange',
        state: {
            rowSelection,
            columnVisibility,
        }
    });

    const selectedRowIds = table.getSelectedRowModel().flatRows.map(row => row.original.id)

    useEffect(() => {
        console.log(selectedRowIds);
    }, [selectedRowIds]);

    useFetchDataEffect({ setData, setIsLoading })

    switch (current_data_table) {
        case 'people':
            return (
                <div className="container py-10 h-full" style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                    <PeopleTableControls />
                    <TableWindow table={table} isLoading={isLoading} />
                    <DataTableFooter
                        current_page={people_table_current_page}
                        page_size={people_page_size}
                        total_items={people_total_items}
                        total_pages={people_total_pages}
                        set_current_page={setPeopleCurrentPage}
                        table={table}
                    />
                </div>
            );
        case 'properties':
            return (
                <div className="container py-10 h-full" style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                    <PropertiesTableControls />
                    <TableWindow table={table} isLoading={isLoading} />
                    <DataTableFooter
                        current_page={properties_current_page}
                        page_size={properties_page_size}
                        total_items={properties_total_items}
                        total_pages={properties_total_pages}
                        set_current_page={setPropertiesCurrentPage}
                        table={table}
                    />
                </div>
            );
        case 'transactions':
            return (
                <div className="container py-10 h-full" style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }}>
                    <TransactionsTableControls />
                    <TableWindow table={table} />
                    <DataTableFooter
                        current_page={transactions_current_page}
                        page_size={transactions_page_size}
                        total_items={transactions_total_items}
                        total_pages={transactions_total_pages}
                        set_current_page={setTransactionsCurrentPage}
                        table={table}
                    />
                </div>
            );
        default:
            return null;
    }
};

export default RenderTab;
