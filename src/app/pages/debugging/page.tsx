"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { usePathname } from 'next/navigation'
import { resetAppState } from '@/app/store/appSlice';
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

const HomePage = () => {
    const appState = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.user);

    console.log('appState', appState);

    return (
        <MainLayout title="Debugging">
            <div style={{ display: 'flex', width: '100%', height: '100%', padding: '10px' }}>
                <Card style={{ flex: 1, overflowY: 'auto' }}>
                    <CardHeader>
                        <CardTitle>App State</CardTitle>
                        <CardDescription>Details of the current application state</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <pre>{JSON.stringify(appState, null, 2)}</pre>
                    </CardContent>
                    <CardFooter>
                        <button onClick={() => { dispatch(resetAppState()); console.log("button clicked"); }}>Reset App State</button>
                    </CardFooter>
                </Card>
                <Card style={{ flex: 1, overflowY: 'auto' }}>
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
                <Card style={{ flex: 1, overflowY: 'auto' }}>
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
        </MainLayout>
    );
};

export default HomePage;
