import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ScriptCheckBox from "./ScriptCheckBox";
import Script from "./Script";

const ScriptOverview = ({ checkedQuestions }) => {
    const categories = [
        { label: "인성", value: "personal" },
        { label: "CS", value: "cs" },
        { label: "기업", value: "company" },
        { label: "자소서", value: "introduce" },
        { label: "복기", value: "review" }
    ];

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [fontSize, setFontSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [title, setTitle] = useState("");

    return (
        <div className="flex w-full font-CookieBold">
            <div className="w-1/3 p-6 border-r border-gray-300">
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

                <div className="flex justify-end mt-6 w-full px-6">
                    <PDFDownloadLink
                        document={
                            <Script
                                selectedCategories={selectedCategories}
                                fontSize={fontSize}
                                lineHeight={lineHeight}
                                title={title}
                                checkedQuestions={checkedQuestions}
                            />
                        }
                        fileName="script.pdf"
                    >
                        {({ loading }) =>
                            loading ? (
                                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                    PDF 생성 중...
                                </button>
                            ) : (
                                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                    출력하기
                                </button>
                            )
                        }
                    </PDFDownloadLink>
                </div>
            </div>

            <div className="w-2/3 p-6">
                <div
                    className="relative"
                    style={{
                        width: "100%",
                        height: 0,
                        paddingBottom: "141.4%",
                        border: "1px solid #000",
                    }}
                >
                    <Script
                        selectedCategories={selectedCategories}
                        fontSize={fontSize}
                        lineHeight={lineHeight}
                        title={title}
                        checkedQuestions={checkedQuestions}
                    />
                </div>
            </div>
        </div>
    );
};

export default ScriptOverview;
