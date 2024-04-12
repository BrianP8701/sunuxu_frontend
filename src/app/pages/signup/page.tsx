// app/pages/signup/page.tsx
'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { signupUser } from '@/app/api/auth';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Dashboard() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); // for routing

    const validateForm = () => {
        console.log('Validating form')
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError('All fields need to be filled out');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSignup = async () => {
        console.log('Signup button clicked');
        if (validateForm()) {
            setError('');
            try {
                const user = await signupUser(email, password);
                console.log('Signup successful', user);
                router.push('/pages/dashboard'); // Redirect to dashboard upon success
            } catch (error) {
                const typedError = error as any;
                setError(typedError.response?.data.error || 'Signup failed');
            }
        }
    };

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input
                                id="first-name"
                                placeholder="Max"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input
                                id="last-name"
                                placeholder="Robinson"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
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
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm password</Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <Button type="button" onClick={handleSignup} className="w-full">
                        Create an account
                    </Button>
                    <Button variant="outline" className="w-full">
                        Sign up with Gmail
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/pages/signin" className="underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block lg:h-screen">
                <Image
                    src="/snow.jpeg"
                    alt="Image"
                    layout="fill"
                    objectFit="cover"
                    className="absolute top-0 left-0 w-full h-full"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
