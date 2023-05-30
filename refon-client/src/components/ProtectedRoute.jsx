import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom';
import {useEffect } from 'react';
import { useLogAuth } from '../context/authContext';

const ProtectedRoute = () => {
  const { auth } = useLogAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    ?.split('=')[1];

  useEffect(() => {
    if (accessToken && location.pathname === '/') {
      navigate('/userinfo', { replace: true });
    }
  }, [accessToken]);

  if (
    location.pathname === '/otp' ||
    location.pathname === '/userinfo' ||
    location.pathname === '/userorders' ||
    location.pathname.startsWith('/orderDetails/')
  ) {
    if (location.pathname === '/otp' && auth?.phoneNumber) {
      return <Outlet />;
    } else if (location.pathname === '/userinfo' && accessToken) {
      return <Outlet />;
    } else if (location.pathname === '/userorders' && accessToken){
      return <Outlet />;
    } else if (location.pathname.startsWith('/orderDetails/') && accessToken) {
      return <Outlet />;
    } else {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  return null;
};

export default ProtectedRoute;
