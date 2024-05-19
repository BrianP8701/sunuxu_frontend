import React, { useState } from 'react';
import PDFViewer from '@/components/custom/pdf/PDFViewer';

interface EditableElement {
    id: number;
    type: 'text' | 'form';
    content: string;
    top: number;
    left: number;
}

const EditablePDF: React.FC<{ file: string | File }> = ({ file }) => {
    const [elements, setElements] = useState<EditableElement[]>([]);

    const addElement = (type: 'text' | 'form') => {
        setElements([...elements, { id: Date.now(), type, content: '', top: 50, left: 50 }]);
    };

    return (
        <div style={{ position: 'relative' }}>
            <PDFViewer file={file} />
            {elements.map((element) => (
                <div
                    key={element.id}
                    style={{
                        position: 'absolute',
                        top: element.top,
                        left: element.left,
                        border: '1px solid #000',
                        padding: '5px',
                        backgroundColor: 'white',
                    }}
                    contentEditable={element.type === 'text'}
                >
                    {element.content}
                </div>
            ))}
            <button onClick={() => addElement('text')}>Add Text Box</button>
            <button onClick={() => addElement('form')}>Add Form Box</button>
        </div>
    );
};

export default EditablePDF;
