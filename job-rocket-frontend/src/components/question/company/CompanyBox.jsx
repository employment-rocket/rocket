import React, { useState } from "react";

const CompanyBox = ({ onSelectCompany }) => {
    const allCompanies = ["기업 은행", "KT&G", "국민 은행", "네이버", "카카오", "쿠팡"];
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCompanies, setFilteredCompanies] = useState(allCompanies);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setFilteredCompanies(
            allCompanies.filter((company) =>
                company.toLowerCase().includes(term.toLowerCase())
            )
        );
    };

    return (
        <div
            className="p-4 bg-gray-50 rounded-lg shadow-md h-[75vh] flex flex-col"
            style={{ fontFamily: "CookieBold" }}
        >
            <h3 className="text-lg font-bold mb-4 text-center">기업 선택하기</h3>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="기업을 검색하세요..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex-1 overflow-y-auto space-y-2">
                {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company, index) => (
                        <button
                            key={index}
                            className="block w-full px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition"
                            onClick={() => onSelectCompany(company)}
                        >
                            {company}
                        </button>
                    ))
                ) : (
                    <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default CompanyBox;
