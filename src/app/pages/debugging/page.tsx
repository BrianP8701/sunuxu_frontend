"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { usePathname } from 'next/navigation'

import MainLayout from '@/components/layouts/MainLayout';

const HomePage = () => {
    const appState = useSelector((state: RootState) => state.app);
    const userState = useSelector((state: RootState) => state.user);

    return (
        <MainLayout
            title="Debugging">
            <div style={{ width: '100%', height: '100%', padding: '10px' }}>
                <h2>App State</h2>
                <pre>{JSON.stringify(appState, null, 2)}</pre>
                <h2>User State</h2>
                <pre>{JSON.stringify(userState, null, 2)}</pre>
                <h2>Pathname</h2>
                <pre>{usePathname()}</pre>
                <h2>Environment Variables</h2>
                <pre>{JSON.stringify(process.env, null, 2)}</pre>
                NEXT_PUBLIC_BACKEND_MODE: {process.env.NEXT_PUBLIC_BACKEND_MODE}
            </div>
        </MainLayout>
    );
};

export default HomePage;
