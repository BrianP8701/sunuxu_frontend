import { useSelector } from 'react-redux';
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from 'react-redux';

import { clearUser } from '@/app/store/userSlice';

function ProfileTab() {
    const router = useRouter(); // for routing
    const dispatch = useDispatch();

    const currentEmail = useSelector((state: any) => state.user.email);
    const currentPhone = useSelector((state: any) => state.user.phone);
    const currentFirstName = useSelector((state: any) => state.user.first_name);
    const currentMiddleName = useSelector((state: any) => state.user.middle_name);
    const currentLastName = useSelector((state: any) => state.user.last_name);

    // Initialize email and phone state with current values from Redux
    const [email, setEmail] = useState(currentEmail);
    const [phone, setPhone] = useState(currentPhone);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const [isPhoneEmpty, setIsPhoneEmpty] = useState(false);

    const handleProfileUpdate = async () => {
        console.log('Update profile button clicked');
        // Here you would typically handle the profile update logic
    }

    return (
        <div className="flex flex-col gap-4 w-[50%] justify-center mx-auto">
            <div className="grid gap-2">
                <Label htmlFor="email" className={isEmailEmpty ? 'error-label' : ''}>Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="phone" className={isPhoneEmpty ? 'error-label' : ''}>Phone</Label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="123-456-7890"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password" className={isPasswordEmpty ? 'error-label' : ''}>Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button type="button" onClick={handleProfileUpdate} className="w-full">
                Update profile
            </Button>

        </div>
    );
}

export default ProfileTab;