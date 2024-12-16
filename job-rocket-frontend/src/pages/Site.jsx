import React from "react";

const Site = () => {
	return (
		<div className="flex justify-center w-full mt-5" style={{ fontFamily: "CookieRegular" }}>
			{[
				{
					title: "채용 공고",
					links: [
						{ name: "잡코리아", url: "https://www.jobkorea.co.kr/" },
						{ name: "사람인", url: "https://www.saramin.co.kr/zf_user/" },
						{ name: "원티드", url: "https://www.wanted.co.kr/" },
						{ name: "로켓펀치", url: "https://www.rocketpunch.com/" },
						{ name: "점핏", url: "https://jumpit.saramin.co.kr/" },
						{ name: "자소설닷컴", url: "https://jasoseol.com/" },
						{ name: "직행", url: "https://zighang.com/" },
						{ name: "잡플래닛", url: "https://www.jobplanet.co.kr/job" },
						{ name: "캐치", url: "https://www.catch.co.kr/" },
						{ name: "슈퍼루키", url: "https://www.superookie.com/" },
					],
				},
				{
					title: "취준 커뮤니티",
					links: [
						{ name: "링커리어", url: "https://linkareer.com/" },
						{ name: "스펙업", url: "https://cafe.naver.com/specup" },
						{ name: "독취사", url: "https://cafe.naver.com/dokchi" },
						{ name: "코멘토", url: "https://comento.kr/?index" },
					],
				},
				{
					title: "기업 분석",
					links: [
						{ name: "잡플래닛", url: "https://www.jobplanet.co.kr/job" },
						{ name: "캐치", url: "https://www.catch.co.kr/" },
						{ name: "DART", url: "https://dart.fss.or.kr/" },
						{ name: "한경 컨센서스", url: "https://consensus.hankyung.com/" },
					],
				},
				{
					title: "대외 활동",
					links: [
						{ name: "슈퍼루키", url: "https://www.superookie.com/" },
						{ name: "링커리어", url: "https://linkareer.com/" },
						{ name: "요즘것들", url: "https://www.allforyoung.com/" },
						{ name: "슥삭", url: "https://www.ssgsag.kr/" },
						{ name: "캠퍼스픽", url: "https://www.campuspick.com/" },
						{ name: "씽굿", url: "https://www.thinkcontest.com/thinkgood/index.do" },
						{ name: "올콘", url: "https://www.all-con.co.kr/" },
					],
				},
				{
					title: "코딩 테스트",
					links: [
						{ name: "백준", url: "https://www.acmicpc.net/" },
						{ name: "프로그래머스", url: "https://programmers.co.kr/" },
						{ name: "소프티어", url: "https://www.softeer.ai/" },
						{ name: "리트코드", url: "https://leetcode.com/" },
						{ name: "구름", url: "https://level.goorm.io/" },
						{ name: "코드트리", url: "https://www.codetree.ai/landing" },
					],
				},
			].map((section, idx) => (
				<div
					key={idx}
					className={`flex flex-col w-[18%] items-center px-3 ${idx !== 4 ? "border-r border-gray-300" : ""
						}`}
				>
					<div
						className="p-4 justify-center rounded-[10px] w-full flex mb-3"
						style={{
							backgroundColor: "#3F83F8",
							color: "white",
							fontFamily: "CookieBold",
							marginBottom: "10px",
						}}
					>
						{section.title}
					</div>
					<div className="space-y-3">
						{section.links.map((link, linkIdx) => (
							<a
								key={linkIdx}
								href={link.url}
								target="_blank"
								rel="noopener noreferrer"
								className="block text-center"
							>
								{link.name}
							</a>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default Site;
