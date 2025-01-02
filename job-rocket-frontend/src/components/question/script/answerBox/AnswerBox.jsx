import React, { useState, useEffect } from "react";
import Answer from "./Answer";
import AnswerCheckBox from "./AnswerCheckBox";
import { getUncheckedAnswers } from "../../../../api/question/QuestionApi";

const AnswerBox = ({ categories, checkedQuestions = {}, onAddCheckedQuestion, onRemoveCheckedQuestion }) => {
    const [questions, setQuestions] = useState([]);
    const [selectedTab, setSelectedTab] = useState("selected");
    const [unCheckedQuestions, setUncheckedQuestions] = useState({
        csAnswerList: [],
        personalAnswerList: [],
        companyAnswerList: [],
        introduceAnswerList: [],
        reviewAnswerList: [],
    });
    const [selectedCategories, setSelectedCategories] = useState(categories.map((c) => c.value));
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const QUESTIONS_PER_PAGE = 7;
    console.log(checkedQuestions);
    useEffect(() => {
        const fetchUncheckedAnswers = async () => {
            setLoading(true);
            try {
                const data = await getUncheckedAnswers(1);
                setUncheckedQuestions(data || {
                    csAnswerList: [],
                    personalAnswerList: [],
                    companyAnswerList: [],
                    introduceAnswerList: [],
                    reviewAnswerList: [],
                });
            } catch (err) {
                setError("질문을 불러오는 중 문제가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchUncheckedAnswers();
    }, []);

    useEffect(() => {
        const allQuestions =
            selectedTab === "selected"
                ? Object.values(checkedQuestions).flat()
                : Object.values(unCheckedQuestions).flat();

        const filteredQuestions = allQuestions.filter((question) =>
            selectedCategories.includes(question.category) &&
            question.question.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setQuestions(filteredQuestions);
        setCurrentPage(1);
    }, [selectedTab, selectedCategories, checkedQuestions, unCheckedQuestions, searchTerm]);

    const updateUncheckedQuestions = (category, question, action) => {
        setUncheckedQuestions((prev) => {
            const listName = `${category.toLowerCase()}AnswerList`;
            if (action === "add") {
                return {
                    ...prev,
                    [listName]: [...prev[listName], question],
                };
            } else if (action === "remove") {
                return {
                    ...prev,
                    [listName]: prev[listName].filter((q) => q.qid !== question.qid),
                };
            }
            return prev;
        });
    };

    const paginatedQuestions = questions.slice(
        (currentPage - 1) * QUESTIONS_PER_PAGE,
        currentPage * QUESTIONS_PER_PAGE
    );

    const handlePageChange = (direction) => {
        setCurrentPage((prev) => {
            if (direction === "next" && prev < Math.ceil(questions.length / QUESTIONS_PER_PAGE)) {
                return prev + 1;
            } else if (direction === "prev" && prev > 1) {
                return prev - 1;
            }
            return prev;
        });
    };

    return (
        <div className="p-4 bg-white border-blue-400 rounded-lg shadow-md h-[75vh] flex flex-col">
            <AnswerCheckBox
                categories={categories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                onSearch={setSearchTerm}
            />
            <div className="flex-1 overflow-y-auto border-2 border-blue-400 rounded-lg p-4">
                {loading ? (
                    <p className="text-center text-gray-500">로딩 중...</p>
                ) : paginatedQuestions.length > 0 ? (
                    paginatedQuestions.map((q) => (
                        <Answer
                            key={`${q.qid}-${q.category}`}
                            qid={q.qid}
                            answerId={q.answerId}
                            question={q.question}
                            content={q.content}
                            category={q.category}
                            isIn={false}
                            onAddCheckedQuestion={(question) => {
                                onAddCheckedQuestion(question);
                                updateUncheckedQuestions(question.category, question, "remove");
                            }}
                            onRemoveCheckedQuestion={(question) => {
                                onRemoveCheckedQuestion(question);
                                updateUncheckedQuestions(question.category, question, "add");
                            }}
                            checkedQuestions={checkedQuestions}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">질문이 없습니다.</p>
                )}
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                    이전
                </button>
                <span>{`${currentPage} / ${Math.ceil(questions.length / QUESTIONS_PER_PAGE)}`}</span>
                <button
                    onClick={() => handlePageChange("next")}
                    disabled={currentPage === Math.ceil(questions.length / QUESTIONS_PER_PAGE)}
                    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default AnswerBox;