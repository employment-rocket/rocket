import React from "react";
import del from "../../assets/delete.png";
import { getAlarms } from "../../api/alarm/AlarmApi";
import { useState, useEffect } from "react";
import note from "../../assets/note.png";
import schedule from "../../assets/schedule.png";
import comment from "../../assets/comment.png";


const Alarm = ({ onClose }) => {

    const [alarms, setAlarms] = useState([]);

    useEffect(() => {
        const fetchAlarms = async () => {
          try {
            const data = await getAlarms();
            setAlarms(data);
          } catch (error) {
            console.error("Failed to fetch alarms:", error);
          }
        };
    
        fetchAlarms();
      }, []);

    return (
      <div
        className="absolute right-2 top-12 mt-2 w-72 bg-white shadow-lg rounded-md z-10 rounded-2xl border border-gray-300 "
        style={{ scrollbarWidth: "thin", scrollbarColor: "#c1c1c1 #f5f5f5" }}
      >
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300">
          <span className="font-bold text-lg text-gray-700">알림</span>
          <img
						src={del}
						alt="닫기버튼"
						onClick={onClose}
						className="cursor-pointer w-5 h-5"
					/>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {alarms.length > 0 ? (
            alarms.map((data) => (
              <div
                key={data.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                <img
                    src={data.type==='NOTE'?note:data.type==='SCHEDULE'?schedule:comment}
                    alt="알림 아이콘"
                    className="h-7 w-7"
                  />
                  <div>
                  
                    <div className="text-sm text-gray-600">{data.content}</div>
                    <div className="text-xs text-gray-400">{`${data.time[0]}-${String(data.time[1]).padStart(2, '0')}-${String(data.time[2]).padStart(2, '0')}`}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">새로운 알림이 없습니다.</div>
          )}
        </div>
      </div>
    );
  };
  
export default Alarm;
