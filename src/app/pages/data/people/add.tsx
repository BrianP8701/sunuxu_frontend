import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { ChevronDown } from 'lucide-react';
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

import { refreshTableData } from '@/app/store/appSlice';
import { addPerson } from '@/api/base';
import { Person } from '@/types/person';

type PersonType = "lead" | "prospect" | "client" | "past_client" | "agent" | "broker" | "attorney" | "other";

const AddPersonDialogContent = () => {
    const dispatch = useDispatch();
    const user_id = useSelector((state: any) => state.user.id);
    const [firstName, setFirstName] = useState<string>('');
    const [middleName, setMiddleName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [personType, setPersonType] = useState<PersonType>('other');    
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

    const handleAddPerson = () => {
        if (validateForm()) {
            setIsLoading(true);
            // Create a Zod Person object
            const newPerson = {
                user_id: user_id,
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                email: email,
                phone: phone,
                type: personType
            } as Person;

            // Call addPerson with the newPerson object
            addPerson(newPerson).then(() => {
                dispatch(refreshTableData());
                setIsLoading(false);
            });
        }
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Add person</DialogTitle>
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
                                {personType ? personType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Person Type'}
                                <ChevronDown className="ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuRadioGroup onValueChange={(value) => setPersonType(value as PersonType)}>
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
                <DialogClose asChild>
                    <Button type="submit" onClick={handleAddPerson} >Add</Button>
                </DialogClose>
            </DialogFooter>
        </>
    )
}

export default AddPersonDialogContent;
