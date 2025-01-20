import React, { useState, useEffect } from "react";
import { getProfile } from "../../../api/profile/ProfileAPI";
import ActivityItem from "../profileCommon/ActivityItem";

const ActivityView = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const profileData = await getProfile();
        const activitySection = profileData.sections.find(
          (section) => section.type === "ACTIVITY"
        );

        if (activitySection?.data.activities?.length > 0) {
          setActivities(activitySection.data.activities);
        } else {
          setActivities([]); 
        }
      } catch (error) {
        console.error("대외활동 데이터 불러오기 실패:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
    
      {activities.length > 0 ? (
        activities.map((activity, index) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            index={index}
            readonly={true} 
          />
        ))
      ) : (
        <p>저장된 대외활동이 없습니다.</p>
      )}
    </div>
  );
};

export default ActivityView;
