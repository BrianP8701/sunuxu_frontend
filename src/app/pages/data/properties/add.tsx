import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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

import { AddressInput } from '@/components/custom/AddressInput';
import { addProperty } from '@/api/base';
import { refreshTableData } from '@/app/store/dataSlice';

const AddPropertyDialogContent = () => {
    const dispatch = useDispatch();

    const user_id = useSelector((state: any) => state.user.id);
    const [address, setAddress] = useState('');
    const [unitNumber, setUnitNumber] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [placeDetails, setPlaceDetails] = useState<{ [key: string]: string }>({});
    const [googlePlaceId, setGooglePlaceId] = useState('');
    const [isAddressEmpty, setIsAddressEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        if (googlePlaceId === '') {
            setIsAddressEmpty(true);
            return false;
        }
        return true;
    }

    const handleAddProperties = () => {
        console.log("user_id", user_id)
        if (validateForm()) {
            setIsLoading(true);
            addProperty(user_id, address, placeDetails.street_number, placeDetails.street_name, placeDetails.street_suffix, unitNumber, placeDetails.city, placeDetails.state, placeDetails.zip);
            dispatch(refreshTableData());
            setIsLoading(false);
        }
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Add property</DialogTitle>
                <DialogDescription>
                    You only need to provide the address for now.
                </DialogDescription>
            </DialogHeader>
            <div className="grid -4 py-4 w-full gap-4">
                <AddressInput width="800px" setAddress={setAddress} setPlaceDetails={setPlaceDetails} setPlaceId={setGooglePlaceId} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                {propertyType ? propertyType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Property Type'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuRadioGroup onValueChange={(value) => setPropertyType(value)}>
                                <DropdownMenuRadioItem value="residential">Residential</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="condo">Condo</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="coop">Coop</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="commercial">Commercial</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="land">Land</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="hoa">HOA</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="industrial">Industrial</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="rental">Rental</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="other">Other</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="grid gap-2">
                    <Input placeholder="Unit Number" onChange={(e) => setUnitNumber(e.target.value)} />
                    <Label htmlFor="unit-number">Unit Number</Label>
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

export default AddPropertyDialogContent;
