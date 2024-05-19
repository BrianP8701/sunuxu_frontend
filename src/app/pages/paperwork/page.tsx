"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThreeDots } from 'react-loader-spinner';
import EditablePDF from '@/components/custom/pdf/EditablePDF';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import MainLayout from '@/components/layouts/MainLayout';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

interface Box {
    id: string;
    x: number;
    y: number;
}

const HomePage: React.FC = () => {
    const [file, setFile] = useState<File | null | string>(null);
    const [boxes, setBoxes] = useState<Box[]>([]);

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file && file.type === "application/pdf") {
            setFile(file);
        } else {
            alert("Please select a PDF file.");
            setFile(null);
        }
    };

    return (
        <MainLayout title="Paperwork">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                    <div style={{ padding: '20px' }}>
                        {file ? (
                            <EditablePDF file={file} />
                        ) : (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100px',
                            }}>
                                <ThreeDots height={80} width={80} color="currentColor" />
                            </div>
                        )}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    <Input id="pdf_file" type="file" onInput={handleFileInput} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </MainLayout>
    );
};

export default HomePage;
