import React, { useState } from "react";
import CategoryTabs from "../components/question/CategoryTabs";
import CheckedQuestions from "../components/question/CheckedQuestions";
import PersonalQuestionBox from "../components/question/personal/PersonalQuestionBox";
import CsQuestionBox from "../components/question/cs/CsQuestionBox";
import IntroduceBox from "../components/question/introduce/IntroduceBox";
import IntroduceQuestionBox from "../components/question/introduce/IntroduceQuestionBox";
import ReviewQuestionBox from "../components/question/review/ReviewQuestionBox";
import ReviewBox from "../components/question/review/ReviewBox";
import CompanyBox from "../components/question/company/CompanyBox";
import CompanyQuestionBox from "../components/question/company/CompanyQuestionBox";

const Question = () => {
	const [category, setCategory] = useState("cs");
	const [selectedIntroduce, setSelectedIntroduce] = useState(null);
	const [selectedReview, setSelectedReview] = useState(null);
	const [selectedCompany, setSelectedCompany] = useState(null);
	const [checkedQuestions, setCheckedQuestions] = useState([]);

	const handleAddCheckedQuestion = (question) => {
		if (!checkedQuestions.includes(question)) {
			setCheckedQuestions((prev) => [...prev, question]);
		}
	};

	const handleRemoveCheckedQuestion = (question) => {
		setCheckedQuestions((prev) => prev.filter((q) => q !== question));
	};

	return (
		<div className="flex flex-col w-full h-full">
			<CategoryTabs category={category} setCategory={setCategory} />
			<div className="flex w-full h-full mt-4 px-6 space-x-4">
				<CheckedQuestions
					className="w-1/6 border-r border-gray-300"
					checkedQuestions={checkedQuestions}
					setCheckedQuestions={setCheckedQuestions}
				/>
				<div className="flex-1">
					{category === "personal" && (
						<div className="w-full h-full">
							<PersonalQuestionBox
								onAddCheckedQuestion={handleAddCheckedQuestion}
								onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
							/>
						</div>
					)}
					{category === "cs" && (
						<div className="w-full h-full">
							<CsQuestionBox
								onAddCheckedQuestion={handleAddCheckedQuestion}
								onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
							/>
						</div>
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
									onAddCheckedQuestion={handleAddCheckedQuestion}
									onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
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
									onAddCheckedQuestion={handleAddCheckedQuestion}
									onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
								/>
							</div>
						</div>
					)}
					{category === "company" && (
						<div className="flex w-full h-full space-x-4">
							<div className="w-1/4">
								<CompanyBox onSelectCompany={(company) => setSelectedCompany(company)} />
							</div>
							<div className="w-3/4">
								<CompanyQuestionBox
									selectedCompany={selectedCompany}
									onAddCheckedQuestion={handleAddCheckedQuestion}
									onRemoveCheckedQuestion={handleRemoveCheckedQuestion}
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
