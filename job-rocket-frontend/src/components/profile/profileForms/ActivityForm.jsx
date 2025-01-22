import React, { useState, useEffect } from "react";
import { getProfile, addProfile, updateProfile } from "../../../api/profile/ProfileAPI";
import ActivityItem from "./../profileCommon/ActivityItem";

const ActivityForm = ({ order, onSave }) => {
  const [activities, setActivities] = useState([]);
  const [hasSavedActivities, setHasSavedActivities] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const profileData = await getProfile();
        const activitySection = profileData.sections.find(
          (section) => section.type === "ACTIVITY"
        );

        if (activitySection?.data.activities?.length > 0) {
          setActivities(activitySection.data.activities);
          setHasSavedActivities(true);
        } else {
          setActivities([]);
          setHasSavedActivities(false);
        }
      } catch (error) {
        console.error("대외활동 데이터 불러오기 실패:", error);
      }
    };

    fetchActivities();
  }, []);

  const handleAddActivity = () => {
    setActivities([
      ...activities,
      {
        id: Date.now(),
        activityName: "",
        organization: "",
        activityYear: "",
        description: "",
      },
    ]);
  };

  const handleRemoveActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  const handleActivityChange = (id, field, value) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    );
  };

  const handleSaveActivities = async () => {
    const profileData = {
      type: "ACTIVITY",
      data: { activities },
      order,
    };

    try {
      await addProfile(profileData);
      alert("대외활동이 성공적으로 저장되었습니다!");
      setHasSavedActivities(true);
      onSave && onSave("activity", true);
    } catch (error) {
      console.error("대외활동 저장 실패:", error);
      alert("대외활동 저장 중 문제가 발생했습니다.");
    }
  };

  const handleUpdateActivities = async () => {
    const profileData = {
      type: "ACTIVITY",
      data: { activities },
      order,
    };

    try {
      await updateProfile(profileData);
      alert("대외활동이 성공적으로 수정되었습니다!");
      onSave && onSave("activity", true);
    } catch (error) {
      console.error("대외활동 수정 실패:", error);
      alert("대외활동 수정 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">대외활동</h2>

      {activities.map((activity, index) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          index={index}
          onChange={handleActivityChange}
          onRemove={handleRemoveActivity}
        />
      ))}

      {activities.length < 30 && (
        <button
          className="px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded hover:bg-indigo-100"
          onClick={handleAddActivity}
        >
          + 대외활동 추가
        </button>
      )}

      <div className="flex justify-end space-x-4 mt-4">
        {!hasSavedActivities ? (
          <button
            onClick={handleSaveActivities}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            저장
          </button>
        ) : (
          <button
            onClick={handleUpdateActivities}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default ActivityForm;
