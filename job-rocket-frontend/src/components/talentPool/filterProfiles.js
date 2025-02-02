export const filterProfilesBySearch = (profiles, searchQuery, filters) => {
  if (!filters || !profiles) return [];

  const lowercasedQuery = searchQuery.toLowerCase();

  return profiles.filter((profile) => {
    const basicInfo = profile.sections.find((section) => section.type === "BASICINFO")?.data || {};
    const skillsSection = profile.sections.find((section) => section.type === "SKILLS")?.data || {};
    const skills = Object.values(skillsSection).flat();

    const allData = [...Object.values(basicInfo), ...skills];

    const matchesSearchQuery = allData.some((value) => {
      if (typeof value === "string") return value.toLowerCase().includes(lowercasedQuery);
      return false;
    });

    const matchesFilters = applyFilters(profile, filters, skills, basicInfo);

    return matchesSearchQuery && matchesFilters;
  });
};

export const applyFilters = (profile, filters, skills, basicInfo) => {
  const matchesSearch =
    !filters.skillSearch ||
    skills.some(
      (skill) =>
        typeof skill === "string" &&
        skill.toLowerCase().includes(filters.skillSearch.toLowerCase())
    );

  const matchesSelectedSkills =
    filters.skill.length === 0 ||
    filters.skill.every((filterSkill) =>
      skills.some(
        (skill) =>
          typeof skill === "string" &&
          skill.toLowerCase() === filterSkill.toLowerCase()
      )
    );

  const matchesTenure =
    filters.tenure.length === 0 ||
    filters.tenure.some((tenure) => {
      if (tenure === "신입") return basicInfo.status === "(신입) 구직 중이에요";
      const years = parseInt(basicInfo.yearsOfExperience, 10) || 0;
      if (tenure === "1-3년") return years >= 1 && years <= 3;
      if (tenure === "4-6년") return years >= 4 && years <= 6;
      if (tenure === "7-9년") return years >= 7 && years <= 9;
      if (tenure === "10년+") return years >= 10;
      return false;
    });

  const matchesCareerState =
    filters.careerState.length === 0 ||
    filters.careerState.some((state) => basicInfo.status === state);

  return matchesSearch && matchesSelectedSkills && matchesTenure && matchesCareerState;
};
