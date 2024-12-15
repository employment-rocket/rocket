import React, { useState } from "react";
import CategoryTabs from "../components/question/CategoryTabs";
import CheckedQuestions from "../components/question/CheckedQuestions";
import PersonalQuestionBox from "../components/question/personal/PersonalQuestionBox";
import CsQuestionBox from "../components/question/cs/CsQuestionBox";
import IntroduceBox from "../components/question/introduce/IntroduceBox";
import IntroduceQuestionBox from "../components/question/introduce/IntroduceQuestionBox";

const Question = () => {
	const [category, setCategory] = useState("personal");
	const [selectedIntroduce, setSelectedIntroduce] = useState(null);

	return (
		<div className="flex flex-col w-full h-full">
			<CategoryTabs category={category} setCategory={setCategory} />
			<div className="flex w-full h-full mt-4 px-6 space-x-4">
				<CheckedQuestions className="w-1/6 border-r border-gray-300" />
				<div className="flex-1">
					{category === "personal" && (
						<div className="w-full h-full">
							<PersonalQuestionBox />
						</div>
					)}
					{category === "cs" && (
						<div className="w-full h-full">
							<CsQuestionBox />
						</div>
					)}
					{category === "introduce" && (
						<div className="flex w-full h-full space-x-4">
							<div className="w-1/2">
								<IntroduceBox
									onSelectIntroduce={(item) => setSelectedIntroduce(item)}
								/>
							</div>
							<div className="w-1/2">
								<IntroduceQuestionBox
									selectedIntroduce={selectedIntroduce}
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
