import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { publicRequest } from "../requests/requestMethods"
import axios from "axios"
import setCookies from "../utils/setCookies"
import { useLogAuth } from '../context/authContext';
import { AppContext } from "../App";
import { BiError } from 'react-icons/bi';
import '../styles/pages/OTP.scss'
import OTPInput, { ResendOTP } from "otp-input-react";

function App() {
  const [OTP, setOTP] = useState("");
  return (
    <>
      <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure />
      <ResendOTP onResendClick={() => console.log("Resend clicked")} />
    </>
  );
}

const OTP = () => {
  const { data } = useContext(AppContext)
  const { setAuth } = useLogAuth()
  const otpInputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber;
  const [otpValues, setOTPValues] = useState([]);

  function App() {
    const [OTP, setOTP] = useState("");
    return (
      <>
        <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure />
        <ResendOTP onResendClick={() => console.log("Resend clicked")} />
      </>
    );
  }
  const handleValidate = async (e) => {
    e.preventDefault();
  }

  const handleKeyDown = (index, event) => {

    if (event.key === 'ArrowRight' && index < otpInputRefs.current.length - 1) {
      const nextInput = otpInputRefs.current[index + 1];
      nextInput.focus();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      const previousInput = otpInputRefs.current[index - 1];
      previousInput.focus();
    }
  };

  const handleChange = () => {
    const res = otpInputRefs.current.map(el => el.value)
    setOTPValues(res.join("").toString())
  }

  useEffect(() => {
    const firstInput = otpInputRefs.current[0];
    firstInput.focus();
  }, [location]);

  const handleFullLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await publicRequest.post(`/check/code`,
        { ...data, code: otpValues })
      if (res.status === 200) {
        const { access_token, name, telephone } = res.data.data
        //***Login Request => saving data to db {telephone, name, accesstoken} => generate new access token and
        // save it to the cookies to use it 
        const response = await axios.post("http://localhost:5000/api/updatedb", { access_token, name, telephone })
        console.log(response)
        setAuth({ ...response.data.authData })
        /**Canceling saving grabbed token to cookies and instead we fetch it from db with axios interceptors in hooks */
        /**but we save the token henerated by our server and save it to cookies */
        const serverAccessToken = response.data.authData.serverAccessToken;
        const tokenMatch = document.cookie.match(/serverAccessToken=([^;]+)/);
        if (!tokenMatch) {
          setCookies(serverAccessToken, 24 * 60 * 60 * 1000)
        }
        navigate("/userinfo")
      }
      // console.log(res)
      // console.log(accessToken)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="entry__banner">
      <div className="otp__Card">
        <div className="otp__card__header">
          <h2>Please Enter The One Time Password (OTP) to verify your account</h2>
          <span className="opt__Card__confirm-text">A code has been sent to 051****444</span>
        </div>
        <form className="otp__card__form" onSubmit={handleValidate}>

          <div className='d-flex'>
            {[0, 1, 2, 3].map((index) => (
              <input
                ref={(el) => (otpInputRefs.current[index] = el)}
                className={`m-2 d-flex text-center form-control rounded ${error ? 'invalid-otp' : ''}`}
                type="text"
                key={index}
                // maxLength="1"
                onKeyDown={(e) => handleKeyDown(index, e)}
                name="code"
                required
                onChange={handleChange}
              />
            ))}
          </div>
          <div className="error mt-1 text-center">
            {error && <p className="text-center">The activation code is not valid.</p>}
          </div>
          <div className="mt-4 text-center">
            {loading ? (
              <Loading />
            ) : (
              <button className="btn btn-danger px-2 validate" type='submit' value="Log in" onClick={(e) => handleFullLogin(e)} >
                Validate
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}

export default OTP