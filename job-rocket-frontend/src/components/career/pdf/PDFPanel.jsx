import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import PDFPreview from "./PDFPreview";
import PDFSectionToggleList from "./PDFSectionToggleList";

const PDFPanel = forwardRef(({ profileRef, sections, setSections, onClose }, ref) => {
  const [title, setTitle] = useState("Career Profile");
  const [isGenerating, setIsGenerating] = useState(false);

  useImperativeHandle(ref, () => ({
    generatePDF: () => {
      return pdfPreviewRef.current?.generatePDF();
    },
  }));

  const handleDownloadPDF = async () => {
    const pdf = await pdfPreviewRef.current?.generatePDF();
    if (pdf) {
      pdf.save(`${title}.pdf`);
    }
  };

  const pdfPreviewRef = React.useRef();

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
          <PDFSectionToggleList sections={sections} setSections={setSections} />
          <button
            onClick={handleDownloadPDF}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all w-full"
            disabled={isGenerating}
          >
            {isGenerating ? "PDF 다운로드 중..." : "PDF 다운로드"}
          </button>
        </div>
        <PDFPreview ref={pdfPreviewRef} profileRef={profileRef} sections={sections} />
      </div>
    </div>
  );
});

export default PDFPanel;
