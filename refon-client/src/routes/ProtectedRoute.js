import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { useEffect } from 'react';
// import useLoginAuth from '../hooks/useLoginAuth';

const ProtectedRoute = () => {
  // const { auth } = useLoginAuth();
  const location = useLocation();
  // const navigate = useNavigate();
  const serverAccessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("serverAccessToken="))
    ?.split("=")[1];

  // **If we added auth verify; browser will navigate to login page with each refresh
  return serverAccessToken ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
