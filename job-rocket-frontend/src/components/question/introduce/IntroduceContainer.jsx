import React, { useState, useEffect } from "react";
import IntroduceBox from "../introduce/IntroduceBox";
import IntroduceQuestionBox from "../introduce/IntroduceQuestionBox";
import { getIntroduces, getIntroduceQuestions } from "../../../api/introduce/IntroduceApi.jsx";

const IntroduceContainer = ({ checkedQuestions, setCheckedQuestions, memberId }) => {
    const [introduces, setIntroduces] = useState([]);
    const [selectedIntroduce, setSelectedIntroduce] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchIntroduces = async () => {
            try {
                const data = await getIntroduces(memberId);
                setIntroduces(data);
            } catch (error) {
                console.error("Failed to fetch introduces:", error.message);
            }
        };
        fetchIntroduces();
    }, [memberId]);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!selectedIntroduce) return;
            try {
                const data = await getIntroduceQuestions(selectedIntroduce.introduceId, memberId);
                setQuestions(data);
            } catch (error) {
                console.error("Failed to fetch questions:", error.message);
            }
        };
        fetchQuestions();
    }, [selectedIntroduce, memberId]);

    const handleAddCheckedQuestion = (question) => {
        setCheckedQuestions((prev) => ({
            ...prev,
            introduceAnswerList: [
                ...(prev.introduceAnswerList || []),
                question,
            ],
        }));
    };

    const handleRemoveCheckedQuestion = (question) => {
        setCheckedQuestions((prev) => ({
            ...prev,
            introduceAnswerList: prev.introduceAnswerList.filter(
                (q) => q.qid !== question.qid
            ),
        }));
    };

    return (
        <div className="flex w-full h-full space-x-4" style={{ fontFamily: "CookieBold" }}>
            <div className="w-1/4">
                <IntroduceBox
                    introduces={introduces}
                    onSelectIntroduce={(introduce) => setSelectedIntroduce(introduce)}
                    setIntroduces={setIntroduces}
                    checkedQuestions={checkedQuestions}
                />
            </div>
            <div className="w-3/4">
                <IntroduceQuestionBox
                    questions={questions}
                    selectedIntroduce={selectedIntroduce?.name}
                    onAddCheckedQuestion={handleAddCheckedQuestion}
                    onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
                    checkedQuestions={checkedQuestions}
                />
            </div>
        </div>
    );
};

export default IntroduceContainer;