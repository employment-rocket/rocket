import React, { useState } from "react";
import { uploadIntroduce } from "../../../api/introduce/IntroduceApi";

const IntroduceModal = ({ onClose, onAddIntroduce }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        const allowedExtensions = ["pdf"];
        const fileExtension = uploadedFile?.name.split(".").pop().toLowerCase();

        if (allowedExtensions.includes(fileExtension)) {
            setFile(uploadedFile);
            setError("");
        } else {
            setError("지원하지 않는 파일 형식입니다. (pdf만 가능)");
            setFile(null);
        }
    };

    const handleSubmit = async () => {
        if (isLoading) return;
        if (!file) {
            setError("파일을 선택해주세요.");
            return;
        }

        if (!name.trim()) {
            setError("자소서 이름을 입력해주세요.");
            return;
        }

        try {
            setIsLoading(true);
            const newIntroduce = await uploadIntroduce(file, name.trim());
            onAddIntroduce(newIntroduce);
            onClose();
        } catch (error) {
            console.error("Failed to upload introduce:", error.message);
            setError("파일 업로드 중 문제가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                <h3 className="text-lg font-bold mb-4">자소서 추가</h3>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="mb-4 w-full p-2 border rounded-lg"
                />
                <input
                    type="text"
                    placeholder="자소서 이름을 입력하세요. (pdf 파일만 가능)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-4 w-full p-2 border rounded-lg"
                />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {isLoading && <p className="text-blue-500 text-sm mb-4">업로드 중입니다...</p>}
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="p-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                        disabled={isLoading}
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSubmit}
                        className={`p-2 ${isLoading ? "bg-blue-300" : "bg-blue-500"} text-white rounded-lg hover:bg-blue-600 transition`}
                        disabled={isLoading}
                    >
                        {isLoading ? "처리 중..." : "추가"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IntroduceModal;
