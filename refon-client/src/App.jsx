import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, OTP, SharedLayout, OrderDetails, UserInfo, UserOrders } from './pages';
import Sidebar from "./components/Sidebar";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useLogAuth } from "./context/authContext";

export const AppContext = createContext()



const App = () => {

  const [data, setData] = useState({})
  const { auth } = useLogAuth()
  console.log(auth)

  const handleChange = (e) => {
    setData(prev => { return { ...prev, [e.target.name]: e.target.value } })
  }

  const serverAccessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('serverAccessToken='))
    ?.split('=')[1];

  return (

    <AppContext.Provider value={{ data, setData, handleChange }}>

      <Routes>

        {/* Public Routes */}
        {(!serverAccessToken) && <Route path="/" element={<Login />} />}
        {/* {accessToken && <Route path="/" element={<Login />} />} */}
        <Route path="/otp" element={<OTP />} />

        {/* Private Routes */}
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/" element={<SharedLayout />}>
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/userorders" element={<UserOrders />} />
          <Route path="/orderDetails/:order" element={<OrderDetails />} />
        </Route>
        {/* </Route> */}

        {/* Catch All Routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AppContext.Provider>

  );
};

export default App;
