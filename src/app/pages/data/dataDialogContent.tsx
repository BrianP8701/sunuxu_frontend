import React from 'react';

import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog"

interface DataDialogProps {
    id: string;
}

const DataDialog: React.FC<DataDialogProps> = ({ id }) => {
    return (
        <DialogHeader>
            <DialogTitle id={id}>Add New Item</DialogTitle>
            <DialogDescription>
                Add a new item to the current tab.
            </DialogDescription>
        </DialogHeader>
    );
}

export default DataDialog;
