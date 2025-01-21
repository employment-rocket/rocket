import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const PDFPreview = forwardRef(({ profileRef, sections }, ref) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (!profileRef?.current) {
      console.warn("Profile reference is not ready.");
      return null;
    }

    setIsGenerating(true);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const canvas = await html2canvas(profileRef.current, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      let yOffset = 0;

      while (yOffset < imgHeight) {
        const pageCropHeight = Math.min(imgHeight - yOffset, pageHeight * (imgWidth / pageWidth));

        pdf.addImage(
          imgData,
          "PNG",
          0,
          0,
          pageWidth,
          (pageCropHeight * pageWidth) / imgWidth,
          null,
          "FAST",
          yOffset
        );

        yOffset += pageCropHeight;

        if (yOffset < imgHeight) {
          pdf.addPage();
        }
      }

      const pdfBlob = pdf.output("blob");
      const previewUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(previewUrl);

      return pdf;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generatePDF();
  }, [sections]);

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
