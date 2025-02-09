import React, { useState, useEffect } from "react";
import Review from "./Review";
import { getSchedules } from "../../../api/schedule/schedule";
import { getSchedulesWithQuestions, createReview, deleteReviewBySchedule } from "../../../api/question/QuestionApi";

const ReviewBox = ({ onSelectSchedule }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [availableSchedules, setAvailableSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetchSchedulesWithQuestions();
    }, []);

    const fetchSchedulesWithQuestions = async () => {
        try {
            const data = await getSchedulesWithQuestions();
            const schedulesArray = Object.values(data).flat();
            setSchedules(schedulesArray);
        } catch (error) {
            console.error("❌ Failed to fetch schedules with questions:", error.message);
        }
    };

    const fetchSchedulesForSelect = async () => {
        try {
            const data = await getSchedules();
            const schedulesArray = Object.values(data).flat();
            setAvailableSchedules(schedulesArray);
        } catch (error) {
            console.error("❌ Failed to fetch schedules:", error.message);
        }
    };

    const handleAddReview = async () => {
        if (!selectedSchedule) {
            alert("스케줄을 선택해주세요.");
            return;
        }

        const isAlreadyReviewed = schedules.some((schedule) => schedule.id === selectedSchedule.id);
        if (isAlreadyReviewed) {
            alert("이미 복기가 등록된 스케줄입니다.");
            return;
        }

        try {
            await createReview(selectedSchedule.id);
            setIsModalOpen(false);
            setSelectedSchedule(null);
            setSchedules((prevSchedules) => [
                ...prevSchedules,
                { id: selectedSchedule.id, title: selectedSchedule.title },
            ]);
        } catch (error) {
            console.error("❌ Failed to create review:", error.message);
        }
    };

    const handleDeleteReview = async (scheduleId) => {
        if (!window.confirm("해당 복기를 삭제하시겠습니까?")) return;
        try {
            await deleteReviewBySchedule(scheduleId);
            setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== scheduleId));
        } catch (error) {
            console.error("❌ Failed to delete review:", error.message);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            fetchSchedulesForSelect();
        }
    }, [isModalOpen]);

    const filteredSchedules = schedules.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 bg-white border-blue-400 rounded-lg shadow-lg h-[75vh] overflow-y-auto">
            <div className="flex flex-col mb-4">
                <h3 className="text-lg font-bold text-center mb-2">면접 복기 목록</h3>
                <input
                    type="text"
                    placeholder="검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 transition"
                />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    복기 추가
                </button>
            </div>
            <div className="space-y-2">
                {filteredSchedules.length > 0 ? (
                    filteredSchedules.map((item) => (
                        <Review
                            key={item.id}
                            text={item.title}
                            onSelect={() => onSelectSchedule(item)}
                            onDelete={() => handleDeleteReview(item.id)}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">등록된 복기가 없습니다.</p>
                )}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-lg font-bold mb-4">복기 추가</h2>
                        <select
                            className="p-2 border rounded-lg w-full mb-4"
                            value={selectedSchedule?.id || ""}
                            onChange={(e) =>
                                setSelectedSchedule(
                                    availableSchedules.find((s) => s.id.toString() === e.target.value)
                                )
                            }
                        >
                            <option value="">스케줄 선택</option>
                            {availableSchedules.map((schedule) => (
                                <option key={schedule.id} value={schedule.id}>
                                    {schedule.title}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                                onClick={() => setIsModalOpen(false)}
                            >
                                취소
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                onClick={handleAddReview}
                            >
                                생성
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewBox;
