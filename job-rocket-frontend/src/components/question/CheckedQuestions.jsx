import React, { useState } from "react";
import CheckedQuestion from "./CheckedQuestion";
import { toggleAnswerIsIn } from "../../api/question/QuestionApi.jsx";

const CheckedQuestions = ({ className, checkedQuestions, setCheckedQuestions, loading, error }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleDelete = async (question) => {
        console.log(question);
        const confirm = window.confirm("선택을 해제하시겠습니까?");
        if (confirm) {
            await toggleAnswerIsIn({ answerId: question.answerId });
            setCheckedQuestions((prev) => ({
                ...prev,
                [`${question.category}AnswerList`]: prev[`${question.category}AnswerList`].filter(
                    (q) => q.qid !== question.qid
                ),
            }));
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (loading) {
        return <p className="text-center text-gray-500">질문을 불러오는 중...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    const filteredQuestions = Object.keys(checkedQuestions).reduce((filtered, categoryKey) => {
        const questions = checkedQuestions[categoryKey] || [];
        const filteredCategory = questions.filter((q) =>
            q.question.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredCategory.length > 0) {
            filtered[categoryKey] = filteredCategory;
        }
        return filtered;
    }, {});

    return (
        <div
            className={`${className} p-4 bg-white border-blue-400 rounded-lg shadow-md h-[75vh]`}
            style={{ fontFamily: "CookieBold", borderWidth: "3px" }}
        >
            <h3 className="text-lg font-bold mb-4 text-center text-gray-500">선택한 질문</h3>
            <hr style={{ borderTopWidth: "3px" }} className="border-blue-400 mb-4" />
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="선택 질문 검색..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>
            {Object.keys(filteredQuestions).every((key) => filteredQuestions[key]?.length === 0) ? (
                <p className="text-sm text-gray-500 text-center">검색 결과가 없습니다.</p>
            ) : (
                Object.keys(filteredQuestions).map((categoryKey) => {
                    const questions = filteredQuestions[categoryKey] || [];

                    return (
                        <div key={categoryKey} className="mb-4">
                            <ul className="space-y-2">
                                {questions.map((question) => (
                                    <li key={question.qid + question.category}>
                                        <CheckedQuestion
                                            question={question}
                                            onDelete={() => handleDelete(question)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default CheckedQuestions;
