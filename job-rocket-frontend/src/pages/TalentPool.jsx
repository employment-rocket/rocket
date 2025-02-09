import React, { useEffect, useState } from "react";
import TalentPoolLayout from "../components/talentPool/talentPoolLayout/TalentPoolLayout";
import { getPublicProfilesPaginated } from "../api/profile/ProfileAPI";
import { filterProfilesBySearch } from "../components/talentPool/filterProfiles";

const tabs = ["전체", "개발", "게임개발", "기획", "마케팅"];

const TalentPool = () => {
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    skill: [],
    tenure: [],
    careerState: [],
    skillSearch: "",
  });
  const [selectedTab, setSelectedTab] = useState("전체");

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

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
        const response = await getPublicProfilesPaginated(currentPage, pageSize);
        setFilteredProfiles(
          filterProfilesBySearch(response.content, "", filters, selectedTab)
        );
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Failed to fetch paginated profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [currentPage, filters, selectedTab]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col items-center bg-white-100">
      <div className="w-full lg:w-[85%]">
        <TalentPoolLayout
          profiles={filteredProfiles}
          filters={filters}
          onFilterChange={handleFilterChange}
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
        />
        <div className="flex justify-center mt-6">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-4 py-2 border rounded-l ${
              currentPage === 0 ? "bg-gray-200 cursor-not-allowed" : "bg-white"
            }`}
          >
            이전
          </button>
          <span className="px-4 py-2 border-t border-b">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            disabled={currentPage + 1 === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-4 py-2 border rounded-r ${
              currentPage + 1 === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white"
            }`}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentPool;
