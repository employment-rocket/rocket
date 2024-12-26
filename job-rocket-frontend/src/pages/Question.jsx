import React, { useEffect, useState } from "react";
import CategoryTabs from "../components/question/CategoryTabs";
import CheckedQuestions from "../components/question/CheckedQuestions";
import IntroduceBox from "../components/question/introduce/IntroduceBox";
import IntroduceQuestionBox from "../components/question/introduce/IntroduceQuestionBox";
import ReviewQuestionBox from "../components/question/review/ReviewQuestionBox";
import ReviewBox from "../components/question/review/ReviewBox";
import CompanyBox from "../components/question/company/CompanyBox";
import CompanyQuestionBox from "../components/question/company/CompanyQuestionBox";
import CsContainer from "../components/question/cs/CsContainer";
import PersonalContainer from "../components/question/personal/PersonalContainer";
import { getCheckedAnswers } from "../api/question/QuestionApi";

const Question = () => {
	const [category, setCategory] = useState("cs");
	const [selectedIntroduce, setSelectedIntroduce] = useState(null);
	const [selectedReview, setSelectedReview] = useState(null);
	const [selectedCompany, setSelectedCompany] = useState(null);
	const [checkedQuestions, setCheckedQuestions] = useState({
		csAnswerList: [],
		personalAnswerList: [],
		companyAnswerList: [],
		introduceAnswerList: [],
		reviewAnswerList: [],
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCheckedAnswers = async () => {
			try {
				setLoading(true);
				const data = await getCheckedAnswers(1);
				setCheckedQuestions(data || {
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

		fetchCheckedAnswers();
	}, []);

	const handleAddCheckedQuestion = (categoryKey, question) => {
		setCheckedQuestions((prev) => ({
			...prev,
			[`${categoryKey}AnswerList`]: [
				...prev[`${categoryKey}AnswerList`],
				question,
			],
		}));
	};

	const handleRemoveCheckedQuestion = (categoryKey, question) => {
		setCheckedQuestions((prev) => ({
			...prev,
			[`${categoryKey}AnswerList`]: prev[`${categoryKey}AnswerList`].filter(
				(q) => q.qid !== question.qid
			),
		}));
	};

	return (
		<div className="flex flex-col w-full h-full">
			<CategoryTabs category={category} setCategory={setCategory} />
			<div className="flex w-full h-full mt-4 px-6 space-x-4">
				<CheckedQuestions
					className="w-1/6"
					checkedQuestions={checkedQuestions}
					setCheckedQuestions={setCheckedQuestions}
					loading={loading}
					error={error}
				/>
				<div className="flex-1">
					{category === "personal" && (
						<PersonalContainer
							checkedQuestions={checkedQuestions}
							setCheckedQuestions={setCheckedQuestions}
						/>
					)}
					{category === "cs" && (
						<CsContainer
							checkedQuestions={checkedQuestions}
							setCheckedQuestions={setCheckedQuestions}
						/>
					)}
					{category === "introduce" && (
						<div className="flex w-full h-full space-x-4">
							<div className="w-1/4">
								<IntroduceBox
									onSelectIntroduce={(item) =>
										setSelectedIntroduce(item)
									}
								/>
							</div>
							<div className="w-3/4">
								<IntroduceQuestionBox
									selectedIntroduce={selectedIntroduce}
									onAddCheckedQuestion={(question) =>
										handleAddCheckedQuestion("introduce", question)
									}
									onRemoveCheckedQuestion={(question) =>
										handleRemoveCheckedQuestion("introduce", question)
									}
								/>
							</div>
						</div>
					)}
					{category === "review" && (
						<div className="flex w-full h-full space-x-4">
							<div className="w-1/4">
								<ReviewBox
									onSelectReview={(item) =>
										setSelectedReview(item)
									}
								/>
							</div>
							<div className="w-3/4">
								<ReviewQuestionBox
									selectedReview={selectedReview}
									onAddCheckedQuestion={(question) =>
										handleAddCheckedQuestion("review", question)
									}
									onRemoveCheckedQuestion={(question) =>
										handleRemoveCheckedQuestion("review", question)
									}
								/>
							</div>
						</div>
					)}
					{category === "company" && (
						<div className="flex w-full h-full space-x-4">
							<div className="w-1/4">
								<CompanyBox
									onSelectCompany={(company) =>
										setSelectedCompany(company)
									}
								/>
							</div>
							<div className="w-3/4">
								<CompanyQuestionBox
									selectedCompany={selectedCompany}
									onAddCheckedQuestion={(question) =>
										handleAddCheckedQuestion("company", question)
									}
									onRemoveCheckedQuestion={(question) =>
										handleRemoveCheckedQuestion("company", question)
									}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Question;
