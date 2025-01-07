import { DayGridView } from "@fullcalendar/daygrid/internal.js";
import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useQuery } from "@tanstack/react-query";
import { getCalendarSchedule } from "../../../api/schedule/schedule";
import Swal from "sweetalert2";

const Calendar = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["calendar"],
		queryFn: getCalendarSchedule,
	});

	if (isLoading) return <div>Loading....</div>;

	function dataToDto(item) {
		return {
			title: item.title,
			start: item.dueDate,
			description: item.type,
			memo: item.memo,
		};
	}

	const events = data.map((item) => dataToDto(item));

	const handleEventClick = (info) => {
		const clickEvent = info.event;

		Swal.fire({
			title: clickEvent.title,
			html: `
				<div>${clickEvent.extendedProps.description}</div>
				<br/>
				<div>${clickEvent.extendedProps.memo}</div>				
				`,
			icon: "info",
			footer: `~ ${clickEvent.startStr}`,
			draggable: true,
		});
	};

	return (
		<div className="p-4 w-full h-full flex flex-col justify-center">
			<div className="h-full">
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
