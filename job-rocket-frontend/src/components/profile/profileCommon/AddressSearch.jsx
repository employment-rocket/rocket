import React, { useEffect, useState } from "react";

const AddressSearch = ({ setAddress, address }) => {
  const [selectedAddress, setSelectedAddress] = useState(address);

  useEffect(() => {
    setSelectedAddress(address);
  }, [address]);


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      console.log("Daum Postcode API 로드 완료.");
    };
    document.body.appendChild(script);


    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const sample6_execDaumPostcode = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          let addr = "";
          let extraAddr = "";

          if (data.userSelectedType === "R") {
            addr = data.roadAddress;
          } else {
            addr = data.jibunAddress;
          }

          if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }
            if (data.buildingName !== "" && data.apartment === "Y") {
              extraAddr += (extraAddr !== "" ? ", " + data.buildingName : data.buildingName);
            }
            if (extraAddr !== "") {
              extraAddr = " (" + extraAddr + ")";
            }
          }

          const fullAddress = `${addr} ${extraAddr}`;
          setSelectedAddress(fullAddress);
          setAddress(fullAddress); 
        },
      }).open();
    } else {
      alert("주소 검색 서비스를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex items-center relative">
      <input
        type="text"
        value={selectedAddress || ""}
        placeholder="주소를 입력해 주세요."
        readOnly
        onClick={sample6_execDaumPostcode} 
        className="flex-grow mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm cursor-pointer pr-10"
      />
      <div
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
        onClick={sample6_execDaumPostcode} 
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="15px" height="15px">
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
        </svg>
      </div>
    </div>
  );
};

export default AddressSearch;
