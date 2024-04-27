// app/home/index.tsx
import React from 'react';
import Link from 'next/link';

import MainLayout from '@/components/layouts/MainLayout';

const HomePage = () => {
    return (
        <MainLayout
            title="Transactions">
            <div style={{ width: '100%', height: '100%' }}>
            </div>
        </MainLayout>
    );
};

export default HomePage;
