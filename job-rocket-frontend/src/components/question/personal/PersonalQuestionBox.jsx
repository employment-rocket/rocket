import React, { useEffect, useState } from "react";
import PersonalQuestion from "./PersonalQuestion";
import { getPersonalQuestions } from "../../../api/question/QuestionApi";

const PersonalQuestionBox = ({ onAddCheckedQuestion, onRemoveCheckedQuestion, checkedQuestions }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const data = await getPersonalQuestions();
            setQuestions(data || []);
        } catch (err) {
            setError("인성 질문을 불러오는 중 문제가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

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
        </div>
    );
};

export default PersonalQuestionBox;
