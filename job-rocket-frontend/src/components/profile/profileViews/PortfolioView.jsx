import React, { useState, useEffect } from "react";
import { getProfile } from "../../../api/profile/ProfileAPI";

const PortfolioView = () => {
  const [urls, setUrls] = useState([]);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const profileData = await getProfile();
        const portfolioSection = profileData.sections.find(
          (section) => section.type === "PORTFOLIO"
        );

        if (portfolioSection) {
          setUrls(portfolioSection.data.urls || []);
          setFiles(
            (portfolioSection.data.files || []).filter(
              (file) => typeof file === "string" && file.trim() !== ""
            )
          );
        } else {
          setUrls([]);
          setFiles([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (isLoading) {
    return <p className="text-gray-500">로딩 중...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8 border-l-4 border-blue-500 pl-4">
        <h3 className="text-md font-semibold mb-4 text-left">URL</h3>
        {urls.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {urls.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-indigo-50 text-indigo-600 rounded-lg shadow hover:bg-indigo-100 transition"
              >
                {decodeURIComponent(url.split("/").pop()) || "URL 링크"}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-left">저장된 URL이 없습니다.</p>
        )}
      </div>
      <div className="border-l-4 border-green-500 pl-4">
        <h3 className="text-md font-semibold mb-4 text-left">파일</h3>
        {files.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <a
                key={index}
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-green-50 text-green-600 rounded-lg shadow hover:bg-green-100 transition"
              >
                {decodeURIComponent(file.split("/").pop()) || "파일 다운로드"}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-left">저장된 파일이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default PortfolioView;
