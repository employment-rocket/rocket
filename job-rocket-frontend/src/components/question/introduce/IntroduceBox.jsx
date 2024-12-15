import React, { useState } from "react";
import Introduce from "./Introduce";

const initialIntroduces = ["네이버", "네이버", "네이버", "네이버"];

const IntroduceBox = ({ onSelectIntroduce }) => {
    const [introduces, setIntroduces] = useState(initialIntroduces);

    const handleDelete = (index) => {
        setIntroduces((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div
            className="p-4 bg-white border-2 border-blue-400 rounded-lg shadow-lg h-[75vh] overflow-y-auto"
            style={{ fontFamily: "CookieBold" }}
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">자소서 목록</h3>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md">
                    추가
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {introduces.map((item, index) => (
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
