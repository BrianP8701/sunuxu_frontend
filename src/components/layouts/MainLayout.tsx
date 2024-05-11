"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import {
    Book,
    Bot,
    LifeBuoy,
    SquareUser,
    Triangle,
    Database,
    FileText,
    LineChart,
    Bug,
    Diamond,
    FlaskConical,
    Scroll,
    Handshake
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ModeToggle } from "@/components/custom/ModeToggle"
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { setCurrentPage } from "@/app/store/appSlice"
import { useDispatch } from "react-redux"
import { SettingsComponent } from "@/components/custom/settings/Settings"

export default function MainLayout({ title, children }: { title: string, children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const current_page = useSelector((state: RootState) => state.app.current_page);

    const handleNavigation = (path: string) => {
        router.push(path);
        dispatch(setCurrentPage(path));
    }

    return (
        <div className="grid h-screen w-full pl-[53px]">
            <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
                <div className="border-b p-2">
                    <Button variant="outline" size="icon" aria-label="Home">
                        <Diamond className="size-5 fill-foreground" />
                    </Button>
                </div>
                <nav className="grid gap-1 p-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`rounded-lg ${current_page === 'copilot' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                                aria-label="Copilot"
                                onClick={() => handleNavigation('copilot')}
                            >
                                <Bot className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Copilot
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`rounded-lg ${current_page === 'data' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                                aria-label="Data"
                                onClick={() => handleNavigation('data')}
                            >
                                <Database className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Data
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`rounded-lg ${current_page === 'transactions' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                                aria-label="Transactions"
                                onClick={() => handleNavigation('transactions')}
                            >
                                <Handshake className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Transactions
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`rounded-lg ${current_page === 'paperwork' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                                aria-label="Paperwork"
                                onClick={() => handleNavigation('paperwork')}
                            >
                                <Scroll className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Paperwork
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`rounded-lg ${current_page === 'documentation' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                                aria-label="Documentation"
                                onClick={() => handleNavigation('documentation')}
                            >
                                <Book className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Documentation
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`rounded-lg ${current_page === 'debugging' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                                aria-label="Debugging"
                                onClick={() => handleNavigation('debugging')}
                            >
                                <Bug className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Debugging
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`rounded-lg ${current_page === 'experimental' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                                aria-label="Experimental"
                                onClick={() => handleNavigation('experimental')}
                            >
                                <FlaskConical className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                            Experimental
                        </TooltipContent>
                    </Tooltip>
                </nav>
                <nav className="mt-auto grid gap-1 p-2">
                    <Tooltip>
                        <Dialog>
                            <DialogTrigger asChild>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="mx-auto rounded-lg"
                                        aria-label="Help"
                                    >
                                        <LifeBuoy className="size-5" />
                                    </Button>
                                </TooltipTrigger>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Looking for help?</DialogTitle>
                                    <DialogDescription>
                                        Contact me directly at 929-386-6970. Please text! I&apos;ll repond as soon as I can.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        <TooltipContent side="right" sideOffset={5}>
                            Help
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <Dialog>
                            <DialogTrigger asChild>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="mt-auto rounded-lg"
                                        aria-label="Account"
                                    >
                                        <SquareUser className="size-5" />
                                    </Button>
                                </TooltipTrigger>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[800px]">
                                <SettingsComponent />
                            </DialogContent>
                        </Dialog>
                        <TooltipContent side="right" sideOffset={5}>
                            Account
                        </TooltipContent>
                    </Tooltip>
                </nav>
            </aside>
            <div className="flex flex-col overflow-hidden">
                <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
                    {/* Allow additional buttons by reserving space with utility classes if necessary */}
                    <div className="flex-1 flex justify-end">
                        <ModeToggle />
                    </div>
                </header>
                <div className="flex-1 overflow-hidden">
                    <div className="w-full h-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
