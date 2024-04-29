// src/app/pages/data/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Home,
    LineChart,
    Users,
    Menu
} from "lucide-react";
import { useDispatch } from 'react-redux';
import { setCurrentCrmTab } from '@/app/store/appSlice';

import PeopleDataTab from '@/components/custom/data/people';
import PropertiesDataTab from '@/components/custom/data/properties';
import TransactionsDataTab from '@/components/custom/data/transactions';

import { propertiesTableColumns } from '@/app/pages/data/propertiesTable';
import { PropertiesTableControls, PropertiesTableFooter } from '@/app/pages/data/propertiesTable';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Payment, columns } from "@/components/custom/data/transactions/columns"
import { DataTable } from "@/components/custom/data-table"

import MainLayout from '@/components/layouts/MainLayout';

const HomePage = () => {
    const dispatch = useDispatch();
    const current_crm_tab = useSelector((state: RootState) => state.app.current_crm_tab);
    const [isNavVisible, setIsNavVisible] = useState(true);

    // For responsive design
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsNavVisible(false);
            } else {
                setIsNavVisible(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call once to set initial state based on current window size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderTab = () => {
        const data = getData()

        switch (current_crm_tab) {
            case 'people':
                return <PeopleDataTab />;
            case 'properties':
                return (
                    <div className="container mx-auto py-10">
                        <PropertiesTableControls />
                        <DataTable columns={propertiesTableColumns} data={data} />
                        <PropertiesTableFooter />
                    </div>
                )
            case 'transactions':
                return (
                    <div className="container mx-auto py-10">
                        <DataTable columns={columns} data={data} />
                    </div>
                )
            default:
                return null;
        }
    };

    function getData(): Payment[] {
        // Fetch data from your API here.
        return [
            {
                id: "728ed52f",
                amount: 100,
                status: "pending",
                email: "m@example.com",
            },
            {
                id: "728ed52g",
                amount: 200,
                status: "processing",
                email: "m@example.com",
            },
            {
                id: "728ed52h",
                amount: 300,
                status: "success",
                email: "m@example.com",
            },
            {
                id: "728ed52i",
                amount: 400,
                status: "failed",
                email: "k@example.com",
            },
            {
                id: "728ed52j",
                amount: 500,
                status: "pending",
                email: "k@example.com",
            },
            
        ]
    }


    const DataNavigation = () => (
        <nav className="p-4">
            <Link
                href="#"
                onClick={() => dispatch(setCurrentCrmTab('people'))}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${current_crm_tab === 'people' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
            >
                <Users className="h-4 w-4" />
                People
            </Link>
            <Link
                href="#"
                onClick={() => dispatch(setCurrentCrmTab('properties'))}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${current_crm_tab === 'properties' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
            >
                <Home className="h-4 w-4" />
                Properties
            </Link>
            <Link
                href="#"
                onClick={() => dispatch(setCurrentCrmTab('transactions'))}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${current_crm_tab === 'transactions' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
            >
                <LineChart className="h-4 w-4" />
                Transactions
            </Link>
        </nav>
    );

    return (
        <MainLayout title="Data">
            <div style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: isNavVisible ? '190px 1fr' : '1fr'
            }}>
                {isNavVisible && (
                    <div className="border-r">
                        <DataNavigation />
                    </div>
                )}
                <div style={{
                    padding: 32, // Ensure padding on all sides
                    flexGrow: 1, // Make sure it takes up all available space
                    display: 'flex', // Use flex to fill the area
                    flexDirection: 'column' // Stack children vertically
                }}>
                    {renderTab()}
                </div>
            </div>
            {!isNavVisible && (
                <Sheet>
                    <SheetTrigger>
                        <Menu className="h-6 w-6" style={{ position: 'absolute', top: 58, left: 58 }} />
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px]">
                        <DataNavigation />
                    </SheetContent>
                </Sheet>
            )}
        </MainLayout>
    );
};

export default HomePage;
