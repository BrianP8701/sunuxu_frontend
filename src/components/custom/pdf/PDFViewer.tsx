import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PDFViewerProps {
  file: string | File;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = React.useState<number>(0);
  const [scale, setScale] = React.useState<number>(1.0);

  const onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    console.log('Document loaded', pdf);
    setNumPages(pdf.numPages);
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3.0)); // Limit max zoom level to 3
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5)); // Limit min zoom level to 0.5
  };

  return (
    <div className="pdf-viewer border" style={{ position: 'relative' }}>
      <ScrollArea style={{ height: `calc(100vh - 106px)` }} >
        <ScrollArea style={{ width: 'auto' }} >
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (_, index) => (
              <Page key={index} pageNumber={index + 1} scale={scale} />
            ))}
          </Document>
        </ScrollArea>
      </ScrollArea>

      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: '10px', zIndex: 10 }}>
        <Button variant="outline" className="w-8 h-8 p-0 flex items-center justify-center" onClick={zoomOut} style={{ pointerEvents: 'auto' }}>
          <ZoomOut className="h-6 w-6" />
        </Button>
        <Button variant="outline" className="w-8 h-8 p-0 flex items-center justify-center" onClick={zoomIn} style={{ pointerEvents: 'auto' }}>
          <ZoomIn className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
