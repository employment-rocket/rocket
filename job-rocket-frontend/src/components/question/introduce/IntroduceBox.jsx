import React, { useState } from "react";
import Introduce from "./Introduce";

const initialIntroduces = ["네이버", "LG", "삼성전자", "SK하이닉스", "배달의 민족"];

const IntroduceBox = ({ onSelectIntroduce }) => {
    const [introduces, setIntroduces] = useState(initialIntroduces);
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (index) => {
        setIntroduces((prev) => prev.filter((_, i) => i !== index));
    };

    const filteredIntroduces = introduces.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className="p-4 bg-white border-2 border-blue-400 rounded-lg shadow-lg h-[75vh] overflow-y-auto"
            style={{ fontFamily: "CookieBold" }}
        >
            <div className="flex flex-col mb-4">
                <h3 className="text-lg font-bold text-center mb-2">자소서 목록</h3>
                <input
                    type="text"
                    placeholder="검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {filteredIntroduces.map((item, index) => (
                    <Introduce
                        key={index}
                        text={item}
                        onDelete={() => handleDelete(index)}
                        onSelect={() => onSelectIntroduce(item)}
                    />
                ))}
            </div>
        </div>
    );
};

export default IntroduceBox;
