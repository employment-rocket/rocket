const TYPE_MAP = {
	서류전형: "Document",
	"1차면접": "First",
	"2차면접": "Second",
	최종: "Final",
};

const State_MAP = {
	진행중: "진행중",
	탈락: "탈락",
	최종합격: "최종합격",
};

function getDDayCalc(dueDate) {
	const target = new Date(dueDate);
	const today = new Date();

	target.setHours(0, 0, 0, 0);
	today.setHours(0, 0, 0, 0);

	const diffTime = target.getTime() - today.getTime();
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays > 0) {
		return `D - ${diffDays}`;
	} else if (diffDays === 0) {
		return "D - Day";
	} else {
		return `D + ${Math.abs(diffDays)}`;
	}
}

export { TYPE_MAP, State_MAP, getDDayCalc };
