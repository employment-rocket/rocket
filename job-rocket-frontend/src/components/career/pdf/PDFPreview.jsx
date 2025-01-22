import React, { useState, forwardRef, useImperativeHandle } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const PDFPreview = forwardRef(({ profileRef }, ref) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const html2pdf = async (element) => {
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const pdf = new jsPDF("p", "mm", "a4", true);
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pageHeight;
    }

    const blob = new Blob([pdf.output("blob")], { type: "application/pdf" });

    return blob;
  };

  const generatePDF = async () => {
    if (!profileRef?.current) {
      console.warn("Profile reference is not ready.");
      return null;
    }

    setIsGenerating(true);

    try {
      const pdfBlob = await html2pdf(profileRef.current);
      const previewUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(previewUrl);

      return pdfBlob;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  useImperativeHandle(ref, () => ({
    generatePDF,
  }));

  return (
    <div className="w-1/2">
      <h3 className="text-lg font-bold mb-4 text-gray-800">미리보기</h3>
      {isGenerating ? (
        <div className="w-full h-[700px] max-h-[75vh] border rounded-md flex justify-center items-center text-gray-500">
          PDF 미리보기 생성 중...
        </div>
      ) : pdfUrl ? (
        <iframe
          src={pdfUrl}
          className="w-full max-h-[75vh] h-[700px] border rounded-md"
          title="PDF Preview"
        />
      ) : (
        <div className="w-full h-[700px] max-h-[75vh] border rounded-md flex justify-center items-center text-gray-500">
          PDF 미리보기를 준비 중입니다.
        </div>
      )}
    </div>
  );
});

export default PDFPreview;
