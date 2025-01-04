import FullCalendar from "@fullcalendar/react";
import { React, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useQuery } from "@tanstack/react-query";
import { getCalendarSchedule } from "../../../api/schedule/schedule";
import InfoModal from "./InfoModal";

const Calendar = () => {
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
	const [item, setItem] = useState({});
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
		setItem(clickEvent);
		setUpdateModalOpen(true);
	};

	return (
		<>
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
			{isUpdateModalOpen && (
				<InfoModal
					data={item}
					isOpen={isUpdateModalOpen}
					onCancel={() => setUpdateModalOpen(false)}
				/>
			)}
		</>
	);
};

export default Calendar;
