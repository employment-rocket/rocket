import React, { useState } from "react";
import CompanyBox from "../company/CompanyBox";
import CompanyQuestionBox from "../company/CompanyQuestionBox";

const CompanyContainer = ({ checkedQuestions, setCheckedQuestions }) => {
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleAddCheckedQuestion = (question) => {
        setCheckedQuestions((prev) => ({
            ...prev,
            companyAnswerList: [
                ...(prev.companyAnswerList || []),
                question,
            ],
        }));
    };

    const handleRemoveCheckedQuestion = (question) => {
        setCheckedQuestions((prev) => ({
            ...prev,
            companyAnswerList: prev.companyAnswerList.filter(
                (q) => q.qid !== question.qid
            ),
        }));
    };

    return (
        <div className="flex w-full h-full space-x-4">
            <div className="w-1/4">
                <CompanyBox
                    onSelectCompany={(company) => setSelectedCompany(company)}
                />
            </div>
            <div className="w-3/4">
                <CompanyQuestionBox
                    selectedCompany={selectedCompany}
                    onAddCheckedQuestion={handleAddCheckedQuestion}
                    onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
                />
            </div>
        </div>
    );
};

export default CompanyContainer;
