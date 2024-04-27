import Link from "next/link";
import { useState } from "react";
import ProfileTab from '@/components/custom/settings/profileTab';
import CopilotTab from '@/components/custom/settings/copilotTab';
import CustomizationTab from '@/components/custom/settings/customizationTab';
import AdvancedTab from '@/components/custom/settings/advancedTab';
import { useSelector } from 'react-redux';
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from 'react-redux';

import { clearUser } from '@/app/store/userSlice';
export function SettingsComponent() {
    const router = useRouter(); // for routing
    const dispatch = useDispatch();

    const [selectedTab, setSelectedTab] = useState("profile");

    const handleTabChange = (tabName: string) => {
        setSelectedTab(tabName);
    };

    const handleSignOut = async () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(clearUser());
        router.push('signin');
    }

    return (
        <div className="flex w-full flex-col overflow-auto">
            <main className="flex flex-col gap-4 p-4">
                <div className="mx-auto grid w-full items-start gap-6">
                    <div className="grid grid-cols-[120px_1fr] gap-6">
                        <nav className="flex flex-col gap-6 text-sm">
                            <Link href="#" onClick={() => handleTabChange("profile")}>My Profile</Link>
                            <Link href="#" onClick={() => handleTabChange("copilot")}>Copilot Settings</Link>
                            <Link href="#" onClick={() => handleTabChange("customization")}>Customization</Link>
                            <Link href="#" onClick={() => handleTabChange("advanced")}>Advanced</Link>
                        </nav>
                        <div className="flex flex-col gap-6 border-l-2 pl-4">
                            {selectedTab === "profile" && <ProfileTab />}
                            {selectedTab === "copilot" && <CopilotTab />}
                            {selectedTab === "customization" && <CustomizationTab />}
                            {selectedTab === "advanced" && <AdvancedTab />}
                        </div>
                    </div>
                </div>
            </main>
            <div className="fixed bottom-4 right-4">
                <Button type="button" onClick={handleSignOut} className="w-full">
                    Sign out
                </Button>
            </div>
        </div>
    );
}