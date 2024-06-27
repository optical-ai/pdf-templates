import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocumentProxy } from 'pdfjs-dist';

// Set the worker path to the provided static asset
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();

interface Coordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface MyDocumentProps {
  pdf: string;
  coordinates: Coordinates[];
}

const MyDocument: React.FC<MyDocumentProps> = ({ pdf, coordinates }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    canvasRefs.current = canvasRefs.current.slice(0, numPages || 0);
  }, [numPages]);

  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
  };

  const drawRectangles = (canvas: HTMLCanvasElement, coords: Coordinates[]) => {
    const context = canvas.getContext('2d');
    if (context) {
      context.strokeStyle = 'red';
      context.lineWidth = 2;
      coords.forEach(coord => {
        context.strokeRect(coord.x, coord.y, coord.width, coord.height);
      });
    }
  };

  const onRenderSuccess = (pageNumber: number) => {
    const canvas = canvasRefs.current[pageNumber - 1];
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        const transform = context.getTransform();
        const scaledCoords = coordinates.map(coord => ({
          x: coord.x * transform.a + transform.e,
          y: coord.y * transform.d + transform.f,
          width: coord.width * transform.a,
          height: coord.height * transform.d,
        }));
        drawRectangles(canvas, scaledCoords);
      }
    }
  };

  return (
    <Document
      file={pdf}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(numPages || 0), (el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          onRenderSuccess={() => onRenderSuccess(index + 1)}
          canvasRef={ref => {
            canvasRefs.current[index] = ref;
          }}
        />
      ))}
    </Document>
  );
};

export default MyDocument;


