import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { useEffect } from 'react';
import useLoginAuth from "../hooks/useLoginAuth";
import { getCookies } from "../utils/manageCookie";

const ProtectedRoute = () => {
  const { auth } = useLoginAuth();
  const location = useLocation();

  const telephone = getCookies("telephone");

  console.log(auth);

  // **If we added auth verify; browser will navigate to login page with each refresh
  return telephone ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
