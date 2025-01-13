import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("AccessToken");

  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요합니다!");
      navigate("/board", { replace: true });
    }
  }, [accessToken, navigate]);

  if (!accessToken) {
    return null;
  }

  return <Outlet />;
};

export default PrivateRoute;
