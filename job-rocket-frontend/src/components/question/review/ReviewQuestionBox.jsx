import React, { useState, useEffect } from "react";
import ReviewQuestion from "./ReviewQuestion";
import { createReviewQuestion, getReviewQAList, updateReviewQA, deleteReviewQA } from "../../../api/question/QuestionApi";

const ReviewQuestionBox = ({
    questions,
    selectedSchedule,
    onAddCheckedQuestion,
    onRemoveCheckedQuestion,
    checkedQuestions,
    setQuestions,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newQuestion, setNewQuestion] = useState("");

    const filteredQuestions = questions.filter((q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fetchUpdatedQuestions = async () => {
        if (selectedSchedule && selectedSchedule.id) {
            try {
                const updatedQuestions = await getReviewQAList(selectedSchedule.id);
                setQuestions(updatedQuestions);
            } catch (error) {
                console.error("❌ Failed to fetch updated questions:", error.message);
            }
        }
    };

    const handleCreateQuestion = async () => {
        if (!selectedSchedule || !selectedSchedule.id) {
            alert("일정을 먼저 선택해주세요!");
            return;
        }
        if (!newQuestion.trim()) {
            alert("질문을 입력해주세요.");
            return;
        }

        try {
            await createReviewQuestion(selectedSchedule.id, newQuestion);
            setIsModalOpen(false);
            setNewQuestion("");
            fetchUpdatedQuestions();
        } catch (error) {
            console.error("❌ Failed to create review question:", error.message);
        }
    };

    const handleUpdateQuestion = async (qid, updatedText) => {
        try {
            await updateReviewQA(qid, updatedText);
            fetchUpdatedQuestions();
        } catch (error) {
            console.error("❌ Failed to update review question:", error.message);
        }
    };

    const handleDeleteQuestion = async (qid) => {
        if (!window.confirm("이 질문을 삭제하시겠습니까?")) return;

        try {
            await deleteReviewQA(qid);
            fetchUpdatedQuestions();
        } catch (error) {
            console.error("❌ Failed to delete review question:", error.message);
        }
    };

    return (
        <div className="p-4 bg-white border-blue-400 rounded-lg shadow-lg h-[75vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                    {selectedSchedule ? selectedSchedule.title : "면접 복기 질문 목록"}
                </h3>
                <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={() => setIsModalOpen(true)}
                >
                    질문 생성
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q) => (
                        <ReviewQuestion
                            key={q.qid}
                            qid={q.qid}
                            question={q.question}
                            answerId={q.answerId}
                            answer={q.answer}
                            isIn={checkedQuestions?.reviewAnswerList?.some((item) => item.qid === q.qid) || false}
                            onAddCheckedQuestion={onAddCheckedQuestion}
                            onRemoveCheckedQuestion={onRemoveCheckedQuestion}
                            checkedQuestions={checkedQuestions}
                            onUpdateQuestion={handleUpdateQuestion}
                            onDeleteQuestion={handleDeleteQuestion}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-4">등록된 질문이 없습니다.</p>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-bold mb-4">질문 생성</h2>
                        <input
                            type="text"
                            placeholder="질문을 입력하세요"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            className="p-2 border rounded-lg w-full mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                            <button className="px-4 py-2 bg-gray-400 text-white rounded-lg" onClick={() => setIsModalOpen(false)}>
                                닫기
                            </button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleCreateQuestion}>
                                생성
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewQuestionBox;
