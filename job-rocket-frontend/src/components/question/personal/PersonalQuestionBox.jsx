import React, { useEffect, useState } from "react";
import PersonalQuestion from "./PersonalQuestion";
import { getPersonalQuestions } from "../../../api/question/QuestionApi";

const PersonalQuestionBox = ({ onAddCheckedQuestion, onRemoveCheckedQuestion, checkedQuestions }) => {
    const [questions, setQuestions] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const memberId = 1;

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const data = await getPersonalQuestions(currentPage - 1, memberId);
            setQuestions(data.content || []);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            setError("인성 질문을 불러오는 중 문제가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div
            className="p-4 bg-white border-blue-400 rounded-lg shadow-md h-[75vh] flex flex-col"
            style={{ fontFamily: "CookieBold", borderWidth: "3px" }}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">인성 질문 선택</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
                {loading ? (
                    <p className="text-center text-gray-500">질문을 불러오는 중...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : questions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {questions.map((q) => (
                            <PersonalQuestion
                                key={q.qid}
                                qid={q.qid}
                                answerId={q.answerId}
                                question={q.question}
                                answer={q.answer}
                                isIn={checkedQuestions?.personalAnswerList?.some((item) => item.qid === q.qid) || false}
                                onAddCheckedQuestion={onAddCheckedQuestion}
                                onRemoveCheckedQuestion={onRemoveCheckedQuestion}
                                checkedQuestions={checkedQuestions}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-8">질문이 없습니다.</div>
                )}
            </div>
            <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        className={`px-4 py-2 text-sm rounded-md font-medium ${currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PersonalQuestionBox;
