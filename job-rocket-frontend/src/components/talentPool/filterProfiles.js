export const filterProfilesBySearch = (profiles, searchQuery, filters) => {
  const lowercasedQuery = searchQuery.toLowerCase();

  return profiles.filter((profile) => {
    const basicInfo = profile.sections.find((section) => section.type === "BASICINFO")?.data || {};
    const profileDataToSearch = {
      memberId: profile.memberId,
      name: basicInfo.name || "이름 없음",
      job: basicInfo.job || "직업 정보 없음",
      status: basicInfo.status || "구직 상태 없음",
      yearsOfExperience: basicInfo.yearsOfExperience || "경력 정보 없음",
      currentCompany: basicInfo.currentCompany || "현재 회사 없음",
      shortIntroduction: basicInfo.shortIntroduction || "소개 없음",
    };

    const skillsSection = profile.sections.find((section) => section.type === "SKILLS")?.data || {};
    const skills = Object.values(skillsSection).flat();
    const allData = [...Object.values(profileDataToSearch), ...skills];

    const matchesSearchQuery = allData.some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowercasedQuery);
      }
      if (Array.isArray(value)) {
        return value.some(
          (item) =>
            typeof item === "string" &&
            item.toLowerCase().includes(lowercasedQuery)
        );
      }
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
      if (tenure === "신입") {
        return (
          (basicInfo.status && basicInfo.status.includes("신입")) ||
          basicInfo.yearsOfExperience === undefined
        );
      } else {
        const years = basicInfo.yearsOfExperience;
        if (years === null || years === undefined) return false;

        if (tenure === "1-3년") {
          return years >= 1 && years <= 3;
        } else if (tenure === "4-6년") {
          return years >= 4 && years <= 6;
        } else if (tenure === "7-9년") {
          return years >= 7 && years <= 9;
        } else if (tenure === "10년+") {
          return years >= 10;
        }
      }
      return false;
    });

  const matchesCareerState =
    filters.careerState.length === 0 ||
    filters.careerState.includes(basicInfo.status);

  console.log("Filters:", filters);
  console.log("Basic Info Status:", basicInfo.status);
  console.log("Basic Info Years of Experience:", basicInfo.yearsOfExperience);
  console.log("Matches Search:", matchesSearch);
  console.log("Matches Selected Skills:", matchesSelectedSkills);
  console.log("Matches Tenure:", matchesTenure);
  console.log("Matches Career State:", matchesCareerState);

  return matchesSearch && matchesSelectedSkills && matchesTenure && matchesCareerState;
};