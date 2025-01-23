import React, { useState, useEffect } from "react";
import { getProfile, addProfile, updateProfile } from "../../../api/profile/ProfileAPI";
import ProjectItem from "./../profileCommon/ProjectItem";

const ProjectForm = ({ order, onSave }) => {
  const [projects, setProjects] = useState([
    {
      id: Date.now(),
      name: "",
      organization: "",
      progress: "",
      duration: { start: "", end: "" },
      description: "",
    },
  ]);
  const [hasSavedProjects, setHasSavedProjects] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const profileData = await getProfile();
        const projectSection = profileData.sections.find(
          (section) => section.type === "PROJECT"
        );

        if (projectSection?.data.projects?.length > 0) {
          setProjects(projectSection.data.projects);
          setHasSavedProjects(true);
        } else {
          setHasSavedProjects(false);
        }
      } catch (error) {
        console.error("프로젝트 데이터 불러오기 실패:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now(),
        name: "",
        organization: "",
        progress: "",
        duration: { start: "", end: "" },
        description: "",
      },
    ]);
  };

  const handleRemoveProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleProjectChange = (id, field, value) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const handleDurationChange = (id, field, value) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, duration: { ...project.duration, [field]: value } }
          : project
      )
    );
  };

  const handleSaveProjects = async () => {
    const profileData = {
      type: "PROJECT",
      data: { projects },
      order,
    };

    try {
      await addProfile(profileData);
      alert("프로젝트가 성공적으로 저장되었습니다!");
      setHasSavedProjects(true);
      onSave && onSave("project", true);
    } catch (error) {
      console.error("프로젝트 저장 실패:", error);
      alert("프로젝트 저장 중 문제가 발생했습니다.");
    }
  };

  const handleUpdateProjects = async () => {
    const profileData = {
      type: "PROJECT",
      data: { projects },
      order,
    };

    try {
      await updateProfile(profileData);
      alert("프로젝트가 성공적으로 수정되었습니다!");
      onSave && onSave("project", true);
    } catch (error) {
      console.error("프로젝트 수정 실패:", error);
      alert("프로젝트 수정 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">프로젝트</h2>

      {projects.map((project, index) => (
        <ProjectItem
          key={project.id}
          project={project}
          index={index}
          onChange={handleProjectChange}
          onDurationChange={handleDurationChange}
          onRemove={handleRemoveProject}
        />
      ))}

      <button
        className="px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded hover:bg-indigo-100"
        onClick={handleAddProject}
      >
        + 프로젝트 추가
      </button>

      <div className="flex justify-end space-x-4 mt-4">
        {!hasSavedProjects ? (
          <button
            onClick={handleSaveProjects}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            저장
          </button>
        ) : (
          <button
            onClick={handleUpdateProjects}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            수정
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
