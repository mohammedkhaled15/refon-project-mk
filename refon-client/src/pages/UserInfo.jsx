import { useEffect, useState } from "react"
import usePrivateRequest from "../hooks/usePrivateRequest"
import { useLocation, useNavigate } from "react-router-dom"
import { FaUserAlt } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md'
import { GrMail } from 'react-icons/gr';
import '../styles/pages/UserInfo.scss'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaUser, FaBirthdayCake } from 'react-icons/fa'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { ImLocation2 } from 'react-icons/im'

const UserInfo = () => {
  const privateRequest = usePrivateRequest()
  const [userInfo, setUserInfo] = useState({})
  const navigate = useNavigate()
  const location = useLocation()

  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const getUserInfo = async () => {
      try {
        const res = await privateRequest.post("/user/details", { signal: controller.signal })
        isMounted && setUserInfo(res.data.data)
      } catch (error) {
        console.log(error)
        navigate("/", { state: { from: location }, replace: true })
      }
    }
    getUserInfo()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [location, navigate, privateRequest])

  console.log(userInfo)

  return (
    <div className='user__content'>
      <div className="section-title">
        <h2>User Info</h2>
      </div>

      {/* {userInfo && Object.keys(userInfo).length > 0 && (
        <div className="user__info__content">
          <div className='user-info__card'>
            <p><FaUserAlt size={25} /></p>
            <p>{userInfo.user_details.full_name}</p>
          </div>
          <div className='user-info__card'>
            <p><GrMail size={25} /></p>
            <p>{userInfo.user_details.email}</p>
          </div>
          <div className='user-info__card'>
            <p><BsFillTelephoneFill size={25} /></p>
            <p>{userInfo.user_details.telephone}</p>
          </div>
        </div>
      )} */}

      {
        userInfo && Object.keys(userInfo).length > 0 && (
          <div className="accordion__container">
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography> <span><FaUser size={25} /></span> <span>User Name</span></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography >
                  {userInfo.user_details.full_name}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography> <span><BsFillTelephoneFill size={25} /></span> <span>Telephone</span></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {userInfo.user_details.telephone}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography> <span><MdAlternateEmail size={25} /></span> <span>Email</span></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {userInfo.user_details.email}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography> <span><FaBirthdayCake size={25} /></span> <span>Birthday</span></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {userInfo.user_details.birth_date}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography> <span><ImLocation2 size={25} /></span> <span>Region</span></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {userInfo.user_details.nationality_name}
                </Typography>
              </AccordionDetails>
            </Accordion>


          </div>
        )
      }

    </div>
  )
}

export default UserInfo
