import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";

import MainLayout from '@/components/layouts/MainLayout';

function ExperimentPage() {
    return (
        <MainLayout title="Experimental">
            <div className="w-full h-full justify-center items-center flex">
                <Card>
                    <CardHeader>
                        <CardTitle>Experimental</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input type="text" placeholder="Search" />
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}

export default ExperimentPage;
