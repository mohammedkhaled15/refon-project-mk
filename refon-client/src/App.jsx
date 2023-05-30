  import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, OTP, SharedLayout, OrderDetails, UserInfo, UserOrders } from './pages';
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

export const AppContext = createContext()



const App = () => {

  const [data, setData] = useState({})

  const handleChange = (e) => {
    setData(prev => { return { ...prev, [e.target.name]: e.target.value } })
  }

  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    ?.split('=')[1];

  return (
   
    <AppContext.Provider value={{ data, setData, handleChange }}>
      
      <Routes>
        {!accessToken && <Route path="/" element={<Login />} />}
        {/* <Route path="/" element={<ProtectedRoute />}> */}
          {accessToken && <Route path="/" element={<Login />} />}
          <Route path="/otp" element={<OTP />} />
          <Route path="/" element={<SharedLayout />}>
            <Route path="/userinfo" element={<UserInfo />} />
            <Route path="/userorders" element={<UserOrders />} />
            <Route path="/orderDetails/:order" element={<OrderDetails />} />
          </Route>

        {/* </Route> */}
      </Routes>
    </AppContext.Provider>
  
  );
};

export default App;
