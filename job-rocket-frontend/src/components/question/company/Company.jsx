import React, { useState } from "react";
import CompanyBox from "./CompanyBox";
import CompanyQuestionBox from "./CompanyQuestionBox";

const Company = ({ onAddCheckedQuestion, onRemoveCheckedQuestion }) => {
    const [selectedCompany, setSelectedCompany] = useState(null);

    return (
        <div
            className="flex w-full h-full space-x-4"
            style={{ fontFamily: "CookieBold" }}
        >
            <div className="w-1/2">
                <CompanyBox onSelectCompany={setSelectedCompany} />
            </div>
            <div className="w-1/2">
                <CompanyQuestionBox
                    selectedCompany={selectedCompany}
                    onAddCheckedQuestion={onAddCheckedQuestion}
                    onRemoveCheckedQuestion={onRemoveCheckedQuestion}
                />
            </div>
        </div>
    );
};

export default Company;
