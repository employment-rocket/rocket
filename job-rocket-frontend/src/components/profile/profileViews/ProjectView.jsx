import React, { useState, useEffect } from "react";
import { getProfile } from "../../../api/profile/ProfileAPI"; 
import ProjectItem from "../profileCommon/ProjectItem";

const ProjectView = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const profileData = await getProfile();
        const projectSection = profileData.sections.find(
          (section) => section.type === "PROJECT"
        );

        if (projectSection?.data.projects?.length > 0) {
          setProjects(projectSection.data.projects);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("프로젝트 조회 실패:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-6xl mx-auto space-y-6">
  

      {/* 프로젝트 목록이 있을 경우 보여주기 */}
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={index}
            onChange={() => {}}
            onDurationChange={() => {}}
            onRemove={() => {}}
            readonly={true} 
          />
        ))
      ) : (
        <p>저장된 프로젝트 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default ProjectView;
