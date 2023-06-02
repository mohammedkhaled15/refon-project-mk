import { useState, useContext } from "react"
import { useLogAuth } from "../context/authContext"
import { useNavigate, useLocation } from 'react-router-dom';
import { BsFillTelephoneFill } from 'react-icons/bs';
import '../styles/pages/Login.scss'
import { publicRequest } from "../requests/requestMethods"
import { AppContext } from "../App";
import { setCookies } from "../utils/manageCookie";

const Login = () => {
  const { setAuth } = useLogAuth();
  const { handleChange, data } = useContext(AppContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleValidate = async (e) => {
    e.preventDefault();

    // Validate the phone number using regex for KSA format
    const isValidNumber = /^05[0-9]{8}$/.test(data.telephone);

    if (isValidNumber) {
      try {
        const response = await publicRequest.post(`/login`, { telephone: data.telephone })
        if (response.status === 200) {
          console.log('API Response:', response);
          setAuth({ phoneNumber: data.telephone });
          navigate('/otp', { state: { telephone: data.telephone } });
          // setCookies("telephone", data.telephone, 24 * 60 * 60 * 1000)
        }

      } catch (error) {
        // Handle API errors
        console.log('API Error:', error);
      }
    } else {
      // Handle validation error for incorrect phone number format
      console.log('Invalid phone number format');
    }
  };

  return (
    <div className="login">
      {/* <header>
      <LanguageSwitcher/>
    </header> */}
      <div className="login__Card">
        <div className="login__card__image">
          <img src="/logo.svg" alt="" />
        </div>
        <div className="login__Card__form">
          <form className="input-group mb-3" onSubmit={handleValidate} value="Log in">
            <span className="input-group-text" id="basic-addon1">
              <BsFillTelephoneFill />
            </span>
            <input
              type="text"
              maxLength={10}
              minLength={10}
              className="form-control"
              placeholder="enter your phone number"
              required
              // value={phoneNumber}
              onChange={(e) => handleChange(e)}
              name="telephone"

            />
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </form>
        </div>

        {error && ( // Display the error message if there is an error
          <div className="login__Card__error">
            <p className='error'>Invalid phone number format</p>
          </div>
        )}
        {
          loading && <Loading />
        }
        <div className="login__Card__text">
          <p>
            if you have trouble, <a href="">Call us</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login