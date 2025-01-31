import React, { useEffect, useState } from "react";
import TalentPoolLayout from "../components/talentPool/talentPoolLayout/TalentPoolLayout";
import { getPublicProfiles } from "../api/profile/ProfileAPI";
import { filterProfilesBySearch } from "../components/talentPool/filterProfiles";

const TalentPool = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    skill: [],
    tenure: [],
    careerState: [],
  });

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => {
      if (type === "skillSearch") {
        return {
          ...prevFilters,
          skillSearch: value,
        };
      } else if (type === "skill") {
        const updatedSkills = prevFilters.skill.includes(value)
          ? prevFilters.skill.filter((skill) => skill !== value)
          : [...prevFilters.skill, value];
        return {
          ...prevFilters,
          skill: updatedSkills,
        };
      } else if (type === "tenure" || type === "careerState") {
        return {
          ...prevFilters,
          [type]: prevFilters[type].includes(value)
            ? prevFilters[type].filter((item) => item !== value)
            : [...prevFilters[type], value],
        };
      }
      return prevFilters;
    });
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fetchedProfiles = await getPublicProfiles();
        setProfiles(fetchedProfiles.filter((profile) => profile.public));
        setFilteredProfiles(fetchedProfiles.filter((profile) => profile.public));
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    profiles.forEach((profile) => {
      const skills = profile.sections.find((section) => section.type === "SKILLS")?.data || {};
      console.log("Profile Skills:", Object.values(skills).flat());
    });
    const filtered = filterProfilesBySearch(profiles, "", filters);
    setFilteredProfiles(filtered);
  }, [profiles, filters]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <TalentPoolLayout
        profiles={filteredProfiles}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default TalentPool;
