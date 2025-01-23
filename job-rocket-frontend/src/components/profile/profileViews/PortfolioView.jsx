import React, { useState, useEffect } from "react";
import { getProfile, fetchFile } from "../../../api/profile/ProfileAPI";

const PortfolioView = () => {
  const [urls, setUrls] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isImage = (fileName) => /\.(jpg|jpeg|png|gif)$/i.test(fileName);

  const fetchPortfolio = async () => {
    setIsLoading(true);
    try {
      const profileData = await getProfile();
      const portfolioSection = profileData.sections.find(
        (section) => section.type === "PORTFOLIO"
      );

      if (portfolioSection) {
        setUrls(portfolioSection.data.urls || []);

        const fetchedItems = await Promise.all(
          (portfolioSection.data.files || []).map(async (file, index) => {
            const fileName = file.fileName || file.name;
            const fileUrl = await fetchFile(fileName, "FILEUPLOAD").catch(() => null);
            return fileUrl
              ? {
                  id: Date.now() + index + Math.random(),
                  name: fileName,
                  url: fileUrl,
                  type: isImage(fileName) ? "image" : "file",
                }
              : null;
          })
        );

        setItems(fetchedItems.filter(Boolean)); 
      } else {
        setUrls([]);
        setItems([]);
      }
    } catch (error) {
      console.error("포트폴리오 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
              <div
                key={index}
                className="p-4 bg-indigo-50 text-indigo-600 rounded-lg shadow hover:bg-indigo-100 transition flex flex-col items-start space-y-2"
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate"
                  title={decodeURIComponent(url.split("/").pop()) || "URL 링크"}
                >
                  {decodeURIComponent(url.split("/").pop()) || "URL 링크"}
                </a>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                >
                  바로가기
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-left">저장된 URL이 없습니다.</p>
        )}
      </div>

      <div className="border-l-4 border-green-500 pl-4">
        <h3 className="text-md font-semibold mb-4 text-left">파일 및 이미지</h3>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-green-50 text-green-600 rounded-lg shadow hover:bg-green-100 transition flex flex-col items-start space-y-2"
              >
                {item.type === "file" ? (
                  <>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate"
                      title={item.name || "파일 다운로드"}
                    >
                      {item.name || "파일 다운로드"}
                    </a>
                    <div className="flex space-x-2">
                      <button
                        className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                        onClick={() => window.open(item.url, "_blank")}
                      >
                        미리보기
                      </button>
                      <a
                        href={item.url}
                        download={item.name}
                        className="text-sm bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition"
                      >
                        다운로드
                      </a>
                    </div>
                  </>
                ) : (
                  <img
                    src={item.url}
                    alt="포트폴리오 이미지"
                    className="max-w-full h-auto"
                  />
                )}
              </div>
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
