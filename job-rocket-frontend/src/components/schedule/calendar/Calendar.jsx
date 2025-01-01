import { DayGridView } from "@fullcalendar/daygrid/internal.js";
import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Calendar = () => {
	const events = [
		{ title: "삼성전자", start: "2025-01-01", description: "서류전형" },
		{ title: "네이버", start: "2025-01-01", description: "면접전형" },
		{ title: "부산은행", start: "2025-01-01", description: "면접전형" },
		{ title: "구글", start: "2025-01-01", description: "면접전형" },
	];

	const handleEventClick = (info) => {
		const clickEvent = info.event;
		alert(`
      이벤트 제목: ${clickEvent.title}
      시작 날짜: ${clickEvent.startStr}
      설명: ${clickEvent.extendedProps.description}
    `);
	};

	return (
		<div className="p-3 w-full h-full flex flex-col justify-center">
			<div className="">
				<FullCalendar
					plugins={[dayGridPlugin]}
					locale={"Ko"}
					headerToolbar={{
						left: "prev",
						center: "title",
						right: "next",
					}}
					events={events}
					eventClick={handleEventClick}
				/>
			</div>
		</div>
	);
};

export default Calendar;
