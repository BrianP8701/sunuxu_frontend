import React from 'react';
import { DataTable } from "./dataTable";
import { DataTableFooter } from './dataTableFooter';
import PropertiesTableControls from './properties/controls';
import PeopleTableControls from './people/controls';
import TransactionsTableControls from './transactions/controls';
import { PeopleTableColumns } from './people/columns';
import { propertiesTableColumns } from './properties/columns';
import { TransactionsTableColumns } from './transactions/columns';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

import { setPropertiesCurrentPage, setPeopleCurrentPage, setTransactionsCurrentPage } from '@/app/store/appSlice';

interface RenderTabProps {
    data: any[] | null;
    rowSelection: {};
    setRowSelection: (ids: {}) => void
    columnVisibility: {};
    setColumnVisibility: (ids: {}) => void
}

const RenderTab: React.FC<RenderTabProps> = ({
    data,
    rowSelection,
    setRowSelection, 
    columnVisibility,
    setColumnVisibility
}) => {
    const current_crm_tab = useSelector((state: RootState) => state.app.current_crm_tab);

    const properties_page_size = useSelector((state: RootState) => state.app.properties_page_size);
    const properties_current_page = useSelector((state: RootState) => state.app.properties_current_page);
    const properties_total_items = useSelector((state: RootState) => state.app.properties_total_items);
    const properties_total_pages = useSelector((state: RootState) => state.app.properties_total_pages);

    const people_page_size = useSelector((state: RootState) => state.app.people_page_size);
    const people_table_current_page = useSelector((state: RootState) => state.app.people_current_page);
    const people_total_items = useSelector((state: RootState) => state.app.people_total_items);
    const people_total_pages = useSelector((state: RootState) => state.app.people_total_pages);

    const transactions_page_size = useSelector((state: RootState) => state.app.transactions_page_size);
    const transactions_current_page = useSelector((state: RootState) => state.app.transactions_current_page);
    const transactions_total_items = useSelector((state: RootState) => state.app.transactions_total_items);
    const transactions_total_pages = useSelector((state: RootState) => state.app.transactions_total_pages);

    switch (current_crm_tab) {
        case 'people':
            return (
                <div className="container py-10 h-full">
                    <PeopleTableControls />
                    <DataTable
                        columns={PeopleTableColumns}
                        data={data || []}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                        columnVisibility={columnVisibility}
                        setColumnVisibility={setColumnVisibility}
                    />
                    <DataTableFooter
                        current_page={people_table_current_page}
                        page_size={people_page_size}
                        total_items={people_total_items}
                        total_pages={people_total_pages}
                        set_current_page={setPeopleCurrentPage}
                    />
                </div>
            );
        case 'properties':
            return (
                <div className="container mx-auto py-10">
                    <PropertiesTableControls />
                    <DataTable
                        columns={propertiesTableColumns}
                        data={data || []}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                        columnVisibility={columnVisibility}
                        setColumnVisibility={setColumnVisibility}
                    />
                    <DataTableFooter
                        current_page={properties_current_page}
                        page_size={properties_page_size}
                        total_items={properties_total_items}
                        total_pages={properties_total_pages}
                        set_current_page={setPropertiesCurrentPage}
                    />
                </div>
            );
        case 'transactions':
            return (
                <div className="container mx-auto py-10">
                    <TransactionsTableControls />
                    <DataTable
                        columns={TransactionsTableColumns}
                        data={data || []}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                        columnVisibility={columnVisibility}
                        setColumnVisibility={setColumnVisibility}
                    />
                    <DataTableFooter
                        current_page={transactions_current_page}
                        page_size={transactions_page_size}
                        total_items={transactions_total_items}
                        total_pages={transactions_total_pages}
                        set_current_page={setTransactionsCurrentPage}
                    />
                </div>
            );
        default:
            return null;
    }
};

export default RenderTab;
