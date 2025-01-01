import React, { useEffect, useState } from "react";
import CategoryTabs from "../components/question/CategoryTabs";
import CheckedQuestions from "../components/question/CheckedQuestions";
import CsContainer from "../components/question/cs/CsContainer";
import PersonalContainer from "../components/question/personal/PersonalContainer";
import ScriptContainer from "../components/question/script/ScriptContainer";
import IntroduceContainer from "../components/question/introduce/IntroduceContainer";
import ReviewContainer from "../components/question/review/ReviewContainer";
import CompanyContainer from "../components/question/company/CompanyContainer";
import { getCheckedAnswers } from "../api/question/QuestionApi";

const Question = () => {
	const [category, setCategory] = useState("PERSONAL");
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

	return (
		<div className="flex flex-col w-full h-full">
			<CategoryTabs category={category} setCategory={setCategory} />

			<div className="flex w-full h-full mt-4 px-6 space-x-4">
				{category !== "SCRIPT" && (
					<CheckedQuestions
						className="w-1/6"
						checkedQuestions={checkedQuestions}
						setCheckedQuestions={setCheckedQuestions}
						loading={loading}
						error={error}
					/>
				)}
				<div className="flex-1">
					{category === "PERSONAL" && (
						<PersonalContainer
							checkedQuestions={checkedQuestions}
							setCheckedQuestions={setCheckedQuestions}
						/>
					)}
					{category === "CS" && (
						<CsContainer
							checkedQuestions={checkedQuestions}
							setCheckedQuestions={setCheckedQuestions}
						/>
					)}
					{category === "INTRODUCE" && (
						<IntroduceContainer
							checkedQuestions={checkedQuestions}
							setCheckedQuestions={setCheckedQuestions}
						/>
					)}
					{category === "REVIEW" && (
						<ReviewContainer
							checkedQuestions={checkedQuestions}
							setCheckedQuestions={setCheckedQuestions}
						/>
					)}
					{category === "COMPANY" && (
						<CompanyContainer
							checkedQuestions={checkedQuestions}
							setCheckedQuestions={setCheckedQuestions}
						/>
					)}
					{category === "SCRIPT" && (
						<ScriptContainer
							checkedQuestions={checkedQuestions}
							setCheckedQuestions={setCheckedQuestions}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Question;