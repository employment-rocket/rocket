import React, { useState, useEffect } from "react";
import { createAnswer, updateAnswer, toggleAnswerIsIn } from "../../../../api/question/QuestionApi";

const Answer = ({
    qid,
    question,
    answerId,
    content,
    category,
    isIn,
    onAddCheckedQuestion,
    onRemoveCheckedQuestion,
    checkedQuestions,
}) => {
    const [isEditing, setIsEditing] = useState(!content);
    const [isAnswering, setIsAnswering] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(content || "");
    const [newAnswerId, setNewAnswerId] = useState(answerId || null);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const normalizedCategory =
            category === "CS" || category === "PERSONAL"
                ? category.toLowerCase()
                : category.toLowerCase().replace("_qa", "");
        const listKey = `${normalizedCategory}AnswerList`;
        const selected = checkedQuestions?.[listKey]?.some((q) => q.qid === qid);
        setIsSelected(selected);
    }, [checkedQuestions, qid, category]);

    const handleInputChange = (e) => {
        setCurrentAnswer(e.target.value);
    };

    const handleToggleCheckedQuestion = async (e) => {
        e.stopPropagation();
        try {
            const normalizedCategory =
                category === "CS" || category === "PERSONAL"
                    ? category.toLowerCase()
                    : category.toLowerCase().replace("_qa", "");
            const listKey = `${normalizedCategory}AnswerList`;

            if (isSelected) {
                const confirm = window.confirm("선택을 해제하시겠습니까?");
                if (confirm) {
                    await toggleAnswerIsIn({ answerId: newAnswerId });
                    onRemoveCheckedQuestion({ qid, question, category, answerId: newAnswerId });
                }
            } else {
                if (!newAnswerId) {
                    const createdAnswerId = await createAnswer({
                        memberId: 1,
                        category,
                        qid,
                        content: currentAnswer,
                        isIn: true,
                    });
                    onAddCheckedQuestion({
                        qid,
                        question,
                        category,
                        answerId: createdAnswerId,
                        content: currentAnswer,
                    });
                    setNewAnswerId(createdAnswerId);
                } else {
                    await toggleAnswerIsIn({ answerId: newAnswerId });
                    onAddCheckedQuestion({
                        qid,
                        question,
                        category,
                        answerId: newAnswerId,
                        content: currentAnswer,
                    });
                }
            }
            setIsSelected((prev) => !prev);
        } catch (error) {
            console.error("Error toggling question:", error);
        }
    };

    const handleSave = async () => {
        try {
            if (!newAnswerId) {
                const createdAnswerId = await createAnswer({
                    memberId: 1,
                    category,
                    qid,
                    content: currentAnswer,
                    isIn: false,
                });
                onAddCheckedQuestion({
                    qid,
                    question,
                    category,
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
                onAddCheckedQuestion({
                    qid,
                    question,
                    category,
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

    return (
        <div className="border rounded-lg shadow-md p-4 bg-white hover:bg-gray-50 transition">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleAnswerInput}
            >
                <span className="text-sm text-gray-700 font-semibold">{question}</span>
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
                    <div className="flex justify-end mt-2">
                        <button
                            className={`px-4 py-2 rounded-lg transition ${isEditing
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-yellow-500 text-white hover:bg-yellow-600"
                                }`}
                            onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        >
                            {isEditing ? "저장" : "수정"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Answer;
