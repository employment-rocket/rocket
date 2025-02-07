import React, { useEffect, useState } from "react";
import TalentPoolLayout from "../components/talentPool/talentPoolLayout/TalentPoolLayout";
import { getPublicProfiles } from "../api/profile/ProfileAPI";
import { filterProfilesBySearch } from "../components/talentPool/filterProfiles";

const tabs = ["전체", "개발", "게임개발", "기획", "마케팅"];

const TalentPool = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    skill: [],
    tenure: [],
    careerState: [],
    skillSearch: "",
  });
  const [selectedTab, setSelectedTab] = useState("전체");

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => {
      const isArray = Array.isArray(prevFilters[type]);
      return {
        ...prevFilters,
        [type]: isArray
          ? prevFilters[type].includes(value)
            ? prevFilters[type].filter((item) => item !== value)
            : [...prevFilters[type], value]
          : value,
      };
    });
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fetchedProfiles = await getPublicProfiles();
        const publicProfiles = fetchedProfiles.filter((profile) => profile.public);
        setProfiles(publicProfiles);
        setFilteredProfiles(
          filterProfilesBySearch(publicProfiles, "", filters, selectedTab)
        );
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    setFilteredProfiles(filterProfilesBySearch(profiles, "", filters, selectedTab));
  }, [profiles, filters, selectedTab]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col items-center bg-gray-100">
      <div className="w-full lg:w-[85%]">
        <TalentPoolLayout
          profiles={filteredProfiles}
          filters={filters}
          onFilterChange={handleFilterChange}
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
};

export default TalentPool;
