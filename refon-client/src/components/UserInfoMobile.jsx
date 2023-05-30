import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useEffect, useState } from "react"
import usePrivateRequest from "../hooks/usePrivateRequest"
import { useLocation, useNavigate } from "react-router-dom"
import {FaUser , FaBirthdayCake} from 'react-icons/fa'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {MdAlternateEmail} from 'react-icons/md'
import {ImLocation2} from 'react-icons/im'

import './UserInfoMobile.scss' ;

const UserInfoMobile = () => {
    const [expanded, setExpanded] = useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
      };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography> <span><FaUser size={25}/></span> <span>User Name</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography >
                        Mohamed Bryik
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography> <span><BsFillTelephoneFill size={25}/></span> <span>Telephone</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        0512222222
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography> <span><MdAlternateEmail size={25}/></span> <span>Email</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                       user@mail.com
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography> <span><FaBirthdayCake size={25}/></span> <span>Birthday</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        01-09-1995
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography> <span><ImLocation2 size={25}/></span> <span>Region</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        KSA
                    </Typography>
                </AccordionDetails>
            </Accordion>
            
            
        </div>
    )
}

export default UserInfoMobile