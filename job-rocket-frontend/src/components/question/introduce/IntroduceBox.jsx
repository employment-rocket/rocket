import React, { useState } from "react";
import Introduce from "./Introduce";
import IntroduceModal from "./IntroduceModal";
import { deleteIntroduce } from "../../../api/introduce/IntroduceApi";

const IntroduceBox = ({ introduces, onSelectIntroduce, setIntroduces }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async (introduceId) => {
        try {
            await deleteIntroduce(introduceId);
            setIntroduces((prev) => prev.filter((item) => item.introduceId !== introduceId));
        } catch (error) {
            console.error("Failed to delete introduce:", error.message);
        }
    };

    const filteredIntroduces = introduces.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 bg-white border-blue-400 rounded-lg shadow-lg h-[75vh] overflow-y-auto">
            <div className="flex flex-col mb-4">
                <h3 className="text-lg font-bold text-center mb-2">자소서 목록</h3>
                <input
                    type="text"
                    placeholder="검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 transition"
                />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    자소서 추가
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {filteredIntroduces.map((item) => (
                    <Introduce
                        key={item.introduceId}
                        text={item.name}
                        createdAt={item.createdAt}
                        onDelete={() => handleDelete(item.introduceId)}
                        onSelect={() => onSelectIntroduce(item)}
                    />
                ))}
            </div>

            {isModalOpen && (
                <IntroduceModal
                    onClose={() => setIsModalOpen(false)}
                    onAddIntroduce={(newIntroduce) =>
                        setIntroduces((prev) => [...prev, newIntroduce])
                    }
                />
            )}
        </div>
    );
};

export default IntroduceBox;
