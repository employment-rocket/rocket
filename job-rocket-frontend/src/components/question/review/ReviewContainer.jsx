import React, { useEffect, useState } from "react";
import ReviewBox from "../review/ReviewBox";
import ReviewQuestionBox from "../review/ReviewQuestionBox";
import { getSchedulesWithQuestions, getReviewQAList } from "../../../api/question/QuestionApi";

const ReviewContainer = ({ checkedQuestions, setCheckedQuestions }) => {
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const data = await getSchedulesWithQuestions();
                const schedulesArray = Object.values(data).flat();
                setSchedules(schedulesArray);

                if (schedulesArray.length > 0) {
                    setSelectedSchedule(schedulesArray[0]);
                }
            } catch (error) {
                console.error("❌ Failed to fetch schedules:", error.message);
            }
        };
        fetchSchedules();
    }, []);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!selectedSchedule || !selectedSchedule.id) return;

            try {
                const data = await getReviewQAList(selectedSchedule.id);
                setQuestions(data);
            } catch (error) {
                console.error(`❌ Failed to fetch review questions for scheduleId ${selectedSchedule.id}:`, error.message);
            }
        };
        fetchQuestions();
    }, [selectedSchedule]);

    const handleAddCheckedQuestion = (question) => {
        setCheckedQuestions((prev) => ({
            ...prev,
            reviewAnswerList: [...(prev.reviewAnswerList || []), question],
        }));
    };

    const handleRemoveCheckedQuestion = (question) => {
        setCheckedQuestions((prev) => ({
            ...prev,
            reviewAnswerList: prev.reviewAnswerList.filter((q) => q.qid !== question.qid),
        }));
    };

    const handleUpdateSchedules = async () => {
        try {
            const updatedSchedules = await getSchedulesWithQuestions();
            setSchedules(Object.values(updatedSchedules).flat());
        } catch (error) {
            console.error("❌ Failed to update schedules:", error.message);
        }
    };

    return (
        <div className="flex w-full h-full space-x-4" style={{ fontFamily: "CookieBold" }}>
            <div className="w-1/4 border-blue-400 rounded-lg shadow-lg" style={{ borderWidth: "3px" }}>
                <ReviewBox
                    schedules={schedules}
                    onSelectSchedule={setSelectedSchedule}
                    setSchedules={setSchedules}
                    refreshSchedules={handleUpdateSchedules}
                />
            </div>
            <div className="w-3/4 border-blue-400 rounded-lg shadow-lg" style={{ borderWidth: "3px" }}>
                <ReviewQuestionBox
                    questions={questions}
                    selectedSchedule={selectedSchedule}
                    onAddCheckedQuestion={handleAddCheckedQuestion}
                    onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
                    checkedQuestions={checkedQuestions}
                    setQuestions={setQuestions}
                />
            </div>
        </div>
    );
};

export default ReviewContainer;
