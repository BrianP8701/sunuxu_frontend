import React, { ReactNode } from 'react';
import Link from 'next/link';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/static/ModeToggle";

type HomeLayoutProps = {
    children: ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
    return (
        <div className="grid grid-rows-[60px_1fr_80px] h-screen">
            <header className="w-full flex justify-between items-center px-4">
                <div className="flex items-center gap-4">
                    {/* Left Section */}
                </div>
                <div className="flex items-center gap-4">
                    <Tabs defaultValue="home" className="flex justify-center w-full">
                        <TabsList className="flex justify-center w-full sm:w-[300px]">
                            <TabsTrigger value="seller">
                                <Link href="/home/seller">Seller</Link>
                            </TabsTrigger>
                            <TabsTrigger value="buyer">
                                <Link href="/home/buyer">Buyer</Link>
                            </TabsTrigger>
                            <TabsTrigger value="agent">
                                <Link href="/home/agent">Agent</Link>
                            </TabsTrigger>
                            <TabsTrigger value="other">
                                <Link href="/home/other">Other</Link>
                            </TabsTrigger>
                            <TabsTrigger value="admin">
                                <Link href="/home/admin">Admin</Link>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Button asChild>
                        <Link href="/authentication/signin">Sign In</Link>
                    </Button>
                </div>
            </header>
            <main className="overflow-auto">{children}</main>
            <footer className="w-full">

            </footer>
        </div>
    );
};

export default HomeLayout;
