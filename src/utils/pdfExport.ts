import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { PrintPreview } from '@/components/PrintPreview';
import { TitlePageContent } from '@/components/TitlePageEditor';
import { showLoading, dismissToast, showSuccess, showError } from './toast';

export const exportToPdf = async (script: string, titlePage: TitlePageContent) => {
  const toastId = showLoading('Generating PDF...');

  try {
    // Create a hidden container for rendering
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '8.5in'; // Standard US Letter width
    container.style.fontFamily = "'Courier New', Courier, monospace";
    container.style.fontSize = '12pt';
    document.body.appendChild(container);

    // Render the PrintPreview component into the hidden container
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(PrintPreview, { script, titlePage }));

    // Allow time for rendering
    await new Promise(resolve => setTimeout(resolve, 500));

    const canvas = await html2canvas(container, {
      scale: 2, // Increase resolution
      useCORS: true,
    });

    // Clean up the container
    document.body.removeChild(container);
    root.unmount();

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter',
    });

    const pdfWidth = 8.5;
    const pdfHeight = 11;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const canvasAspectRatio = canvasWidth / canvasHeight;
    const imgWidth = pdfWidth;
    const imgHeight = imgWidth / canvasAspectRatio;

    let heightLeft = imgHeight;
    let position = 0;

    // Add title page (which is the first part of the canvas)
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add subsequent pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    const safeTitle = titlePage.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'script';
    pdf.save(`${safeTitle}.pdf`);

    dismissToast(toastId);
    showSuccess('PDF exported successfully!');
  } catch (error) {
    console.error('Failed to export PDF:', error);
    dismissToast(toastId);
    showError('Could not generate PDF. Please try again.');
  }
};