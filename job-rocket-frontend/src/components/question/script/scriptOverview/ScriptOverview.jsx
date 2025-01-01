import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import ScriptCheckBox from "./ScriptCheckBox";
import { addFontToPdf } from "../../../../assets/fonts/fontHelper";

const ScriptOverview = ({ checkedQuestions, categories }) => {
    const [selectedCategories, setSelectedCategories] = useState(categories.map((c) => c.value));
    const [fontSize, setFontSize] = useState(12);
    const [lineHeight, setLineHeight] = useState(0.8);
    const [title, setTitle] = useState("스크립트 제목");
    const [pdfUrl, setPdfUrl] = useState(null);

    const generatePDF = () => {
        const pdf = new jsPDF("p", "mm", "a4");
        addFontToPdf(pdf);
        pdf.setFont("CookieRunBold", "normal");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const margin = 10;
        const contentWidth = pageWidth - margin * 2;
        let cursorY = margin;

        pdf.setFontSize(fontSize);
        pdf.text(title, pageWidth / 2, cursorY, { align: "center" });
        cursorY += fontSize + 5;

        selectedCategories.forEach((value) => {
            const category = categories.find((c) => c.value === value);
            const questions = Object.values(checkedQuestions).flat().filter((q) => q.category === value);
            if (questions.length === 0) return;

            pdf.setFontSize(fontSize + 2);
            pdf.text(category.label, margin, cursorY);
            cursorY += fontSize + 4;

            pdf.setFontSize(fontSize);
            questions.forEach((question, index) => {
                const questionText = `${index + 1}. ${question.question}`;
                const contentText = question.content;
                const questionLines = pdf.splitTextToSize(questionText, contentWidth);
                const contentLines = pdf.splitTextToSize(contentText, contentWidth);

                const lineHeightAdjustment = lineHeight * 0.8;

                if (
                    cursorY +
                    (questionLines.length + contentLines.length) * fontSize * lineHeightAdjustment >
                    pdf.internal.pageSize.getHeight() - margin
                ) {
                    pdf.addPage();
                    cursorY = margin;
                }

                pdf.text(questionLines, margin, cursorY);
                cursorY += questionLines.length * fontSize * lineHeightAdjustment;

                pdf.text(contentLines, margin, cursorY);
                cursorY += contentLines.length * fontSize * lineHeightAdjustment + 5;
            });
        });

        return pdf;
    };

    useEffect(() => {
        const pdf = generatePDF();
        const pdfBlob = pdf.output("blob");
        const pdfBlobUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfBlobUrl);
        return () => URL.revokeObjectURL(pdfBlobUrl);
    }, [selectedCategories, fontSize, lineHeight, title, checkedQuestions]);

    return (
        <div className="flex w-full h-full gap-4" style={{ fontFamily: "CookieBold" }}>
            <div className="w-2/3 p-4 bg-white shadow-lg border-2 border-blue-400 rounded-lg overflow-hidden">
                {pdfUrl ? (
                    <iframe
                        src={pdfUrl}
                        title="PDF Preview"
                        className="w-full h-full border-0"
                    />
                ) : (
                    <p className="text-center text-gray-500">PDF를 생성 중입니다...</p>
                )}
            </div>

            <div className="w-1/3 bg-white shadow-lg border-2 border-blue-400 rounded-lg p-4">
                <ScriptCheckBox
                    categories={categories}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    lineHeight={lineHeight}
                    setLineHeight={setLineHeight}
                    title={title}
                    setTitle={setTitle}
                />
            </div>
        </div>
    );
};

export default ScriptOverview;
