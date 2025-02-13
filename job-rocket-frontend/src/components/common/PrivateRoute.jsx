import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../context/auth/AuthContext";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    console.log("Checking authentication:", isAuthenticated);

    if (!isAuthenticated && !checkingAuth) {
      setTimeout(() => {
        if (!isAuthenticated) {
          alert("로그인이 필요합니다!");
          navigate("/board", { replace: true });
        }
      }, 100);
    }

    if (checkingAuth) {
      setCheckingAuth(false);
    }
  }, [isAuthenticated, navigate, checkingAuth]);

  if (!isAuthenticated) {
    return null;
  }

  return <Outlet />;
};

export default PrivateRoute;
