import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { ReloadIcon } from "@radix-ui/react-icons"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { addProperty } from '@/api/base';

const AddTransactionDialogContent = () => {
    const user_id = useSelector((state: any) => state.user.id);

    const [firstName, setFirstName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [PropertiesType, setPropertiesType] = useState<string>('');
    const [isFirstNameEmpty, setIsFirstNameEmpty] = useState<boolean>(false);
    const [isLastNameEmpty, setIsLastNameEmpty] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateForm = () => {
        if (firstName === '') {
            setIsFirstNameEmpty(true);
        }
        if (lastName === '') {
            setIsLastNameEmpty(true);
        }

        if (firstName !== '' && lastName !== '') {
            return true;
        }
        return false;
    }

    const handleAddProperties = () => {
        console.log("user_id", user_id)
        if (validateForm()) {
            setIsLoading(true);
            addProperty();
            setIsLoading(false);
        }
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>New Properties</DialogTitle>
                <DialogDescription>
                    You only need to provide the first and last name for now.
                </DialogDescription>
            </DialogHeader>
            <div className="grid -4 py-4 w-full gap-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name" className={isFirstNameEmpty ? 'error-color' : ''}>First name</Label>
                        <Input
                            id="first-name"
                            placeholder="Max"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="middle-name">Middle name</Label>
                        <Input
                            id="middle-name"
                            placeholder="Max"
                            required
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="last-name" className={isLastNameEmpty ? 'error-color' : ''}>Last name</Label>
                        <Input
                            id="last-name"
                            placeholder="Robinson"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full" // Add this class to make the input full width
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="jack@gmail.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            placeholder="1236678899"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                {PropertiesType ? PropertiesType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Properties Type'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuRadioGroup onValueChange={(value) => setPropertiesType(value)}>
                                <DropdownMenuRadioItem value="prospect">Prospect</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="lead">Lead</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="client">Client</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="past_client">Past Client</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="agent">Agent</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="broker">Broker</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="attorney">Attorney</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <DialogFooter>
                {isLoading ? (
                    <Button disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button type="submit" onClick={handleAddProperties} >Add</Button>
                )}
            </DialogFooter>
        </>
    )
}

export default AddTransactionDialogContent;
