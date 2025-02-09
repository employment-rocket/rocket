import React, { useState, useEffect } from "react";
import { usePortfolio } from "./../profileForms/usePortfolio";
import { fetchFile } from "../../../api/profile/ProfileAPI";

const PortfolioView = ({ order }) => {
  const { items, isLoading, fetchPortfolio } = usePortfolio(order);

  const [fileUrls, setFileUrls] = useState({});

  useEffect(() => {
    fetchPortfolio(); 
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      const urls = {};
      await Promise.all(
        items.map(async (item) => {
          if (item.type === "file" || item.type === "image") {
            try {
              const fileUrl = await fetchFile(item.value, "FILEUPLOAD");
              urls[item.id] = fileUrl;
            } catch (error) {
              console.error(`파일 로드 실패: ${item.name}`, error);
              urls[item.id] = null; 
            }
          }
        })
      );
      setFileUrls(urls);
    };

    if (items.length > 0) {
      fetchFiles();
    }
  }, [items]);

  if (isLoading) {
    return <p className="text-gray-500">로딩 중...</p>;
  }

  const urls = items.filter((item) => item.type === "url");
  const files = items.filter((item) => item.type === "file");
  const images = items.filter((item) => item.type === "image");

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8 border-l-4 border-blue-500 pl-4">
        <h3 className="text-md font-semibold mb-4 text-left">URL</h3>
        {urls.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {urls.map((url) => (
              <div
                key={url.id}
                className="p-4 bg-indigo-50 text-indigo-600 rounded-lg shadow hover:bg-indigo-100 transition flex flex-col items-start space-y-2"
              >
                <a
                  href={url.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate max-w-[200px] block"
                  title={decodeURIComponent(url.value.split("/").pop()) || "URL 링크"}
                >
                  {decodeURIComponent(url.value.split("/").pop()) || "URL 링크"}
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
        {files.length > 0 || images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...files, ...images].map((item) => (
              <div
                key={item.id}
                className="p-4 bg-green-50 text-green-600 rounded-lg shadow hover:bg-green-100 transition flex flex-col items-start space-y-2"
              >
                {item.type === "file" ? (
                  <>
                    <a
                      href={fileUrls[item.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate max-w-[200px] block"
                      title={item.name || "파일 다운로드"}
                    >
                      {item.name || "파일 다운로드"}
                    </a>
                    <div className="flex space-x-2">
                      <button
                        className="text-sm bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                        onClick={() => window.open(fileUrls[item.id], "_blank")}
                      >
                        미리보기
                      </button>
                      <a
                        href={fileUrls[item.id]}
                        download={item.name}
                        className="text-sm bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition"
                      >
                        다운로드
                      </a>
                    </div>
                  </>
                ) : (
                  <img
                    src={fileUrls[item.id]}
                    alt={item.name || "이미지"}
                    className="max-w-full h-auto rounded-lg shadow"
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
