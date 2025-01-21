import React, { useEffect, useState } from "react";
import TalentPoolLayout from "../components/talentPool/talentPoolLayout/TalentPoolLayout";
import { getPublicProfiles } from "./../api/profile/ProfileAPI";
import TalentCategory from "../components/talentPool/talentPoolComponents/TalentCategory";

const TalentPool = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    skill: "",
    tenure: [
      { label: "1~3년", value: "1-3", checked: false },
      { label: "4~6년", value: "4-6", checked: false },
      { label: "7~10년", value: "7-10", checked: false },
    ],
  });

  const handleFilterChange = (type, value) => {
    if (type === "skill") {
      setFilters({ ...filters, skill: value });
    } else if (type === "tenure") {
      setFilters({
        ...filters,
        tenure: filters.tenure.map((option) =>
          option.value === value
            ? { ...option, checked: !option.checked }
            : option
        ),
      });
    }
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fetchedProfiles = await getPublicProfiles();
        setProfiles(fetchedProfiles.filter((profile) => profile.public));
      } catch (error) {
        console.error("프로필 데이터를 가져오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <TalentCategory />
    
    <TalentPoolLayout
      profiles={profiles}
      filters={filters}
      onFilterChange={handleFilterChange}
    />
    </div>
  );
};

export default TalentPool;
