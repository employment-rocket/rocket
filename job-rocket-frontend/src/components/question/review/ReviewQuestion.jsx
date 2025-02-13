import React, { useState, useEffect } from "react";
import { createAnswer, updateAnswer, toggleAnswerIsIn } from "../../../api/question/QuestionApi";

const ReviewQuestion = ({
    qid,
    question,
    answerId,
    answer,
    isIn,
    onAddCheckedQuestion,
    onRemoveCheckedQuestion,
    checkedQuestions,
    onUpdateQuestion,
    onDeleteQuestion,
}) => {
    const [isEditing, setIsEditing] = useState(!answer);
    const [isAnswering, setIsAnswering] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(answer || "");
    const [newAnswerId, setNewAnswerId] = useState(answerId || null);
    const [isSelected, setIsSelected] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedQuestion, setEditedQuestion] = useState(question);

    useEffect(() => {
        const selected = checkedQuestions?.reviewAnswerList?.some((q) => q.qid === qid);
        setIsSelected(selected);
    }, [checkedQuestions, qid]);

    const handleInputChange = (e) => {
        setCurrentAnswer(e.target.value);
    };

    const handleToggleCheckedQuestion = async (e) => {
        e.stopPropagation();
        try {
            if (isSelected) {
                if (window.confirm("선택을 해제하시겠습니까?")) {
                    await toggleAnswerIsIn({ answerId: newAnswerId });
                    onRemoveCheckedQuestion({ qid, question, category: "REVIEW_QA", answerId: newAnswerId });
                }
            } else {
                if (!newAnswerId) {
                    const createdAnswerId = await createAnswer({
                        category: "REVIEW_QA",
                        qid,
                        content: currentAnswer,
                        isIn: true,
                    });
                    onAddCheckedQuestion({
                        qid,
                        question,
                        category: "REVIEW_QA",
                        answerId: createdAnswerId,
                        content: currentAnswer,
                    });
                    setNewAnswerId(createdAnswerId);
                } else {
                    await toggleAnswerIsIn({ answerId: newAnswerId });
                    onAddCheckedQuestion({
                        qid,
                        question,
                        category: "REVIEW_QA",
                        answerId: newAnswerId,
                        content: currentAnswer,
                    });
                }
            }
        } catch (error) {
            console.error("Error toggling question:", error);
        }
    };

    const handleSave = async () => {
        try {
            if (!newAnswerId) {
                const createdAnswerId = await createAnswer({
                    category: "REVIEW_QA",
                    qid,
                    content: currentAnswer,
                    isIn: false,
                });
                onAddCheckedQuestion({
                    qid,
                    question,
                    category: "REVIEW_QA",
                    answerId: createdAnswerId,
                    content: currentAnswer,
                });
                setNewAnswerId(createdAnswerId);
                alert("답변이 작성되었습니다.");
            } else {
                await updateAnswer({
                    answerId: newAnswerId,
                    content: currentAnswer,
                });
                alert("답변이 수정되었습니다.");
            }
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving answer:", error);
            alert("답변 저장 중 오류가 발생했습니다.");
        }
    };

    const toggleAnswerInput = () => {
        setIsAnswering((prev) => !prev);
    };

    const handleDeleteQuestion = async () => {
        try {
            await onDeleteQuestion(qid);
            setIsMenuOpen(false);
        } catch (error) {
            console.error("Error deleting question:", error);
            alert("질문 삭제 중 오류가 발생했습니다.");
        }
    };

    const handleUpdateQuestion = async () => {
        try {
            await onUpdateQuestion(qid, editedQuestion);
            setIsEditModalOpen(false);
            setIsMenuOpen(false);
        } catch (error) {
            console.error("Error updating question:", error);
            alert("질문 수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="border rounded-lg shadow-md p-4 bg-white hover:bg-gray-50 transition">
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700 font-semibold">{question}</span>
                <div className="flex items-center space-x-2">
                    <button
                        className={`px-3 py-1 text-sm rounded-md border-2 transition ${isSelected ? "bg-blue-500 text-white border-blue-500" : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
                            }`}
                        onClick={handleToggleCheckedQuestion}
                    >
                        V
                    </button>
                    <div className="relative">
                        <button
                            className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded-md"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            ⋮
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-24 bg-white border rounded-lg shadow-lg z-10">
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsEditModalOpen(true)}
                                >
                                    수정
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    onClick={handleDeleteQuestion}
                                >
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <hr className="border-gray-300 my-3" />

            {isAnswering && (
                <div>
                    <textarea
                        value={currentAnswer}
                        onChange={handleInputChange}
                        placeholder="답변을 입력하세요..."
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        rows="3"
                    ></textarea>
                    <div className="flex justify-end mt-2">
                        <button
                            className={`px-4 py-2 rounded-lg transition ${isEditing ? "bg-green-500 text-white hover:bg-green-600" : "bg-yellow-500 text-white hover:bg-yellow-600"
                                }`}
                            onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        >
                            {isEditing ? "저장" : "수정"}
                        </button>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-bold mb-4">질문 수정</h2>
                        <input
                            type="text"
                            value={editedQuestion}
                            onChange={(e) => setEditedQuestion(e.target.value)}
                            className="p-2 border rounded-lg w-full mb-4"
                        />
                        <div className="flex justify-end space-x-2">
                            <button className="px-4 py-2 bg-gray-400 text-white rounded-lg" onClick={() => setIsEditModalOpen(false)}>
                                취소
                            </button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleUpdateQuestion}>
                                수정 완료
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewQuestion;
