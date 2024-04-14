import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface UserTypeSelectProps {
    value: string;
    onChange: (value: string) => void;
}

const UserTypeSelect: React.FC<UserTypeSelectProps> = ({ value, onChange }) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="What are you?" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>User Types</SelectLabel>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default UserTypeSelect;