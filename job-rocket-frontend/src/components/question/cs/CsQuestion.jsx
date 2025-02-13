import React, { useState } from "react";
import { toggleAnswerIsIn, createAnswer, updateAnswer } from "../../../api/question/QuestionApi";

const CsQuestion = ({
    qid,
    answerId,
    question,
    category,
    answer,
    recommendedAnswer,
    isIn,
    onAddCheckedQuestion,
    onRemoveCheckedQuestion,
    checkedQuestions,
}) => {
    const [isEditing, setIsEditing] = useState(!answer);
    const [isAnswering, setIsAnswering] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(answer || "");
    const [showRecommendedAnswer, setShowRecommendedAnswer] = useState(false);
    const [newAnswerId, setNewAnswerId] = useState(answerId || null);
    const isSelected = checkedQuestions?.csAnswerList?.some((q) => q.qid === qid);

    const handleInputChange = (e) => {
        setCurrentAnswer(e.target.value);
    };

    const handleToggleCheckedQuestion = async (e) => {
        e.stopPropagation();
        try {
            if (isSelected) {
                const confirm = window.confirm("선택을 해제하시겠습니까?");
                if (confirm) {
                    await toggleAnswerIsIn({ answerId: newAnswerId });
                    onRemoveCheckedQuestion({ qid, question, category: "CS", answerId: newAnswerId });
                }
            } else {
                if (!newAnswerId) {
                    const createdAnswerId = await createAnswer({
                        category: "CS",
                        qid,
                        content: currentAnswer,
                        isIn: true,
                    });
                    onAddCheckedQuestion({ qid, question, category: "CS", answerId: createdAnswerId, content: currentAnswer });
                    setNewAnswerId(createdAnswerId);
                } else {
                    await toggleAnswerIsIn({ answerId: newAnswerId });
                    onAddCheckedQuestion({ qid, question, category: "CS", answerId: newAnswerId, content: currentAnswer });
                }
            }
        } catch (error) {
            console.error("Error toggling checked question:", error);
        }
    };

    const toggleAnswerInput = () => {
        setIsAnswering((prev) => !prev);
    };

    const toggleRecommendedAnswer = () => {
        setShowRecommendedAnswer((prev) => !prev);
    };

    const handleSave = async () => {
        try {
            if (!newAnswerId) {
                const createdAnswerId = await createAnswer({
                    category: "CS",
                    qid,
                    content: currentAnswer,
                    isIn: false,
                });
                onAddCheckedQuestion({ qid, question, category: "CS", answerId: createdAnswerId, content: currentAnswer });
                setNewAnswerId(createdAnswerId);
                alert("답변이 작성되었습니다.");
            } else {
                await updateAnswer({
                    answerId: newAnswerId,
                    content: currentAnswer,
                });

                onRemoveCheckedQuestion({ qid, question, category: "CS", answerId: newAnswerId });
                onAddCheckedQuestion({ qid, question, category: "CS", answerId: newAnswerId, content: currentAnswer });
                alert("답변이 수정되었습니다.");
            }
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving answer:", error);
            alert("답변 저장 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="border rounded-lg shadow-md p-4 bg-white hover:bg-gray-50 transition">
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleAnswerInput}>
                <div>
                    <span className="text-sm text-gray-700 font-semibold">{question}</span>
                    <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-600">
                        {category}
                    </span>
                </div>
                <button
                    className={`px-3 py-1 text-sm rounded-md border-2 transition ${isSelected
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
                        }`}
                    onClick={handleToggleCheckedQuestion}
                >
                    V
                </button>
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
                    <div className="flex justify-between mt-2">
                        <button
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            onClick={toggleRecommendedAnswer}
                        >
                            {showRecommendedAnswer ? "추천 답변 숨기기" : "추천 답변 보기"}
                        </button>
                        <button
                            className={`px-3 py-1 rounded-lg transition ${isEditing
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-yellow-500 text-white hover:bg-yellow-600"
                                }`}
                            onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        >
                            {isEditing ? "저장" : "수정"}
                        </button>
                    </div>
                    {showRecommendedAnswer && (
                        <div className="mt-3 p-2 bg-gray-100 rounded-lg text-sm text-gray-700">
                            <strong>추천 답변:</strong> {recommendedAnswer}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CsQuestion;
