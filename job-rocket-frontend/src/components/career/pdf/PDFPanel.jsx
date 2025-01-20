import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const PDFPanel = forwardRef(({ profileRef, sections, setSections, onClose }, ref) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [title, setTitle] = useState("Career Profile");
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
        const cropHeight = Math.min(imgHeight - yOffset, pageHeight * (imgWidth / pageWidth));

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = imgWidth;
        tempCanvas.height = cropHeight;

        const ctx = tempCanvas.getContext("2d");
        ctx.drawImage(
          canvas,
          0,
          yOffset,
          imgWidth,
          cropHeight,
          0,
          0,
          imgWidth,
          cropHeight
        );

        const imgPart = tempCanvas.toDataURL("image/png");
        pdf.addImage(imgPart, "PNG", 0, 0, pageWidth, (cropHeight * pageWidth) / imgWidth);

        yOffset += cropHeight;
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

  // 상태 변경 시 PDF 재생성
  useEffect(() => {
    generatePDF();
  }, [sections]);

  useImperativeHandle(ref, () => ({
    generatePDF,
  }));

  const handleDownloadPDF = async () => {
    const pdf = await generatePDF();
    if (pdf) {
      pdf.save(`${title}.pdf`);
    }
  };

  const toggleSection = (sectionName) => {
    setSections((prev) =>
      prev.map((section) =>
        section.name === sectionName ? { ...section, visible: !section.visible } : section
      )
    );
  };

  const filteredSections = sections
    .filter((section) => section.name !== "BASICINFO" && section.name !== "TAGSSELECTION" && section.name !== "INTERESTFIELD")
    .sort((a, b) => a.order - b.order);

  return (
    <div className="fixed top-0 right-0 h-full bg-white shadow-lg w-full p-6 overflow-y-auto transition-transform">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">PDF 설정</h2>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-all"
        >
          닫기
        </button>
      </div>

      <div className="flex gap-6">
        <div className="w-1/2">
          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-600">PDF 저장 제목</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </label>
          <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-2">
            {filteredSections.map((section) => (
              <div
                key={section.name}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-md shadow-sm"
              >
                <span className="text-sm font-medium text-gray-700">{section.label}</span>
                <button
                  onClick={() => toggleSection(section.name)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center leading-none ${
                    section.visible
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  {section.visible ? "활성화" : "비활성화"}
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleDownloadPDF}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all w-full flex items-center justify-center leading-none"
            disabled={isGenerating}
          >
            {isGenerating ? "PDF 다운로드 중..." : "PDF 다운로드"}
          </button>
        </div>
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
      </div>
    </div>
  );
});

export default PDFPanel;
