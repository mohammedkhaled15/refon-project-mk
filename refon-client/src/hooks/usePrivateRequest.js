import { useEffect } from "react";
import { privateDbApiRequest } from "../requests/requestMethods";
import { useNavigate } from "react-router-dom";
import { useLogAuth } from "../context/authContext";
import { setCookies } from "../utils/manageCookie";
import { getCookies } from "../utils/manageCookie";
// import axios from "axios";

const usePrivateRequest = () => {
  const { auth, setAuth } = useLogAuth();
  const navigate = useNavigate();

  const serverAccessToken = getCookies("serverAccessToken");

  useEffect(() => {
    const requestInterceptor = privateDbApiRequest.interceptors.request.use(
      async (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${serverAccessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = privateDbApiRequest.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          // 1st senario set access_token cookie to undefined through this request
          // the navigate to login page to obtain a new access token
          setCookies("telephone", null, -1000);
          setCookies("serverAccessToken", null, -1000);
          setAuth({});
          navigate("/");
          console.log("logging Out");
        }
        return Promise.reject(err);
      }
    );

    return () => {
      privateDbApiRequest.interceptors.request.eject(requestInterceptor);
      privateDbApiRequest.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, navigate, serverAccessToken, setAuth]);

  return privateDbApiRequest;
};

export default usePrivateRequest;
