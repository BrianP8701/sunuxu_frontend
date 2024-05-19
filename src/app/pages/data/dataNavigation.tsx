// src/app/pages/data/crmTabNavigation.tsx
"use client";

import {
    Home,
    Users,
    Handshake
} from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Button } from "@/components/ui/button"

import { setCurrentCrmTab } from '@/app/store/dataSlice';

export const DataNavigation = () => {
    const dispatch = useDispatch();
    const current_data_table = useSelector((state: RootState) => state.data.current_data_table);
    return (
        <nav>
            <Button
                variant="outline"
                className={`mt-4 w-full border-none shadow-none justify-start ${current_data_table === 'people' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                onClick={() => dispatch(setCurrentCrmTab('people'))}
            >
                <Users className="mr-3 h-4 w-4" /> People
            </Button>
            <Button
                variant="outline"
                className={`mt-4 w-full border-none shadow-none justify-start ${current_data_table === 'properties' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                onClick={() => dispatch(setCurrentCrmTab('properties'))}
            >
                <Home className="mr-3 h-4 w-4" /> Properties
            </Button>
            <Button
                variant="outline"
                className={`mt-4 w-full border-none shadow-none justify-start ${current_data_table === 'transactions' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                onClick={() => dispatch(setCurrentCrmTab('transactions'))}
            >
                <Handshake className="mr-3 h-4 w-4" /> Transactions
            </Button>
        </nav>
    );
};
