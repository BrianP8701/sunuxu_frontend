"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { usePathname } from 'next/navigation'
import { resetAppState } from '@/app/store/appSlice';
import { resetDataState } from '@/app/store/dataSlice';
import MainLayout from '@/components/layouts/MainLayout';
import { useDispatch } from 'react-redux';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const HomePage = () => {
    const appState = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.user);
    const dataState = useSelector((state: RootState) => state.data);

    return (
        <MainLayout title="Debugging">
            <div style={{ display: 'flex', width: '100%', height: 'calc(100%)', padding: '10px', overflowX: 'auto' }}>
                <div style={{ display: 'flex', height: '100%', minWidth: '1600px' }}>  {/* Ensure enough width to hold all cards side by side */}

                    <Card style={{ flex: 'none', overflowY: 'auto', width: '400px', height: '100%' }}>
                        <CardHeader>
                            <CardTitle>Data State</CardTitle>
                            <CardDescription>Data Redux Slice values</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <pre>{JSON.stringify(dataState, null, 2)}</pre>
                        </CardContent>
                        <CardFooter>
                            <button onClick={() => { dispatch(resetDataState()); }}>Reset Data State</button>
                        </CardFooter>
                    </Card>
                    <Card style={{ flex: 'none', overflowY: 'auto', width: '400px', height: '100%' }}>
                        <CardHeader>
                            <CardTitle>App State</CardTitle>
                            <CardDescription>Details of the current application state</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <pre>{JSON.stringify(appState, null, 2)}</pre>
                        </CardContent>
                        <CardFooter>
                            <button onClick={() => { dispatch(resetAppState()); }}>Reset App State</button>
                        </CardFooter>
                    </Card>
                    <Card style={{ flex: 'none', overflowY: 'auto', width: '400px', height: '100%' }}>
                        <CardHeader>
                            <CardTitle>User State</CardTitle>
                            <CardDescription>Details of the current user state</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <pre>{JSON.stringify(userState, null, 2)}</pre>
                        </CardContent>
                        <CardFooter>
                            <p>Manage user state details above</p>
                        </CardFooter>
                    </Card>
                    <Card style={{ flex: 'none', overflowY: 'auto', width: '400px', height: '100%' }}>
                        <CardHeader>
                            <CardTitle>Pathname & Environment Variables</CardTitle>
                            <CardDescription>Current pathname and environment variables</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <h2>Pathname</h2>
                            <pre>{usePathname()}</pre>
                            <h2>Environment Variables</h2>
                            <pre>{JSON.stringify(process.env, null, 2)}</pre>
                            <p>NEXT_PUBLIC_BACKEND_MODE: {process.env.NEXT_PUBLIC_BACKEND_MODE}</p>
                            <p>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}</p>
                        </CardContent>
                        <CardFooter>
                            <p>Review the pathname and environment variables</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </MainLayout >
    );
};

export default HomePage;
