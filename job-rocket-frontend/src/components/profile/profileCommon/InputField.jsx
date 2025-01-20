import React from "react";

const InputField = ({ label, value, name, handleChange, type = "text" }) => {
  const handleInputChange = (e) => handleChange(e);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          value={value}
          onChange={handleInputChange}
          name={name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none"
          rows={3}
          placeholder={`${label}을 입력해 주세요.`}
        />
      ) : (
        <input
          type={type}
          id={name}
          value={value}
          onChange={handleInputChange}
          name={name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={`${label}을 입력해 주세요.`}
        />
      )}
    </div>
  );
};

export default InputField;
