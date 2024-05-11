"use client";
import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectSeparator
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TailSpin } from "react-loader-spinner";
import { getAddressAutocomplete, getPlaceDetails } from "@/api/googlePlaces"

interface AddressInputProps {
    width?: string;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    setPlaceDetails: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    setPlaceId: React.Dispatch<React.SetStateAction<string>>;
}

export const AddressInput: React.FC<AddressInputProps> = ({
    width = "280px",
    setAddress,
    setPlaceDetails,
    setPlaceId
}) => {
    const [currentQuery, setCurrentQuery] = useState<string>("");
    const [previousQuery, setPreviousQuery] = useState<string>("");
    const [sessionToken, setSessionToken] = useState<string | null>(uuidv4());
    const [sessionTokenExpiresAt, setSessionTokenExpiresAt] = useState<string | null>(new Date(Date.now() + 5 * 60000).toISOString());
    const [sessionUses, setSessionUses] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [autocompleteOptions, setAutocompleteOptions] = useState<{ address: string, place_id: string }[]>([]);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    const validateSessionToken = () => {
        if (!sessionToken || !sessionTokenExpiresAt || new Date(sessionTokenExpiresAt) < new Date() || sessionUses > 10) {
            const new_session_token = uuidv4();
            setSessionToken(new_session_token);
            const expires_at = new Date(Date.now() + 5 * 60000);
            setSessionTokenExpiresAt(expires_at.toISOString());
            setSessionUses(1);
        } else {
            setSessionUses(currentUses => currentUses + 1);
        }
    };

    const updateValue = async (value: string) => {
        setCurrentQuery(value);
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        setDebounceTimer(setTimeout(async () => {
            if (value !== "" && value !== previousQuery) {
                setIsLoading(true);
                validateSessionToken();
                const response = await getAddressAutocomplete(value, sessionToken ?? "");
                setPreviousQuery(value);
                setAutocompleteOptions(Array.isArray(response) ? response : []);
                setIsLoading(false);
            } else if (value === "") {
                setAutocompleteOptions([]);
                setIsLoading(false);
            }
        }, 300));
    };

    const handleSelect = async (place_id: string) => {
        const selectedAddress = autocompleteOptions.find(option => option.place_id === place_id)?.address || "";
        setAddress(selectedAddress);
        setPlaceId(place_id);
        validateSessionToken();

        try {
            const response = await getPlaceDetails(place_id, sessionToken ?? "");
            setPlaceDetails(response);
        } catch (error) {
            console.error("Failed to fetch place details:", error);
            setPlaceDetails({});
        }
    };

    return (
        <Select onValueChange={handleSelect}>
            <SelectTrigger className={`w-[${width}]`}>
                <SelectValue placeholder="Address" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <Input placeholder="Search address..." onChange={(e) => updateValue(e.target.value)} className="border-none flex-grow" value={currentQuery} />
                    <div className="flex w-full max-w-sm items-center">
                        {isLoading ? <div style={{ width: '25px', marginLeft: '15px' }}><TailSpin color="#808080" height={25} width={25} /></div> : <div style={{ width: '25px' }}></div>}
                    </div>
                    <SelectSeparator />
                    {autocompleteOptions.map(option => (
                        <SelectItem key={option.place_id} value={option.place_id}>{option.address}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
