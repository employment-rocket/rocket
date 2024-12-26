import React from "react";
import CompanyQuestion from "./CompanyQuestion";

const CompanyQuestionBox = ({ selectedCompany, onAddCheckedQuestion, onRemoveCheckedQuestion }) => {
    const questions = [
        `${selectedCompany} 관련 예상 질문 1`,
        `${selectedCompany} 관련 예상 질문 2`,
        `${selectedCompany} 관련 예상 질문 3`,
    ];

    return (
        <div
            className="p-4 bg-white border-blue-400 rounded-lg shadow-md h-[75vh] overflow-y-auto"
            style={{ fontFamily: "CookieBold", borderWidth: "3px" }}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">{selectedCompany} 예상 질문</h3>
            </div>
            <div className="space-y-4">
                {questions.map((question, index) => (
                    <CompanyQuestion
                        key={index}
                        question={question}
                        onAddCheckedQuestion={onAddCheckedQuestion}
                        onRemoveCheckedQuestion={onRemoveCheckedQuestion}
                    />
                ))}
            </div>
        </div>
    );
};

export default CompanyQuestionBox;
