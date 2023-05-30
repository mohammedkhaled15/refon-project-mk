import {FaUserAlt , FaShoppingCart} from 'react-icons/fa' ;
import { BsFillHeartFill , BsFillBellFill } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { Link, NavLink } from 'react-router-dom';


const NewSidebar = () => {
  return (
    <div className='sidebar__bottom'>
        <div className="sidebar__bottom-icon">
            <NavLink to="/userinfo">
                <span>
                    <FaUserAlt size={25}/>
                </span>
            </NavLink>
            <NavLink to="/userorders">
                <span>
                    <FaShoppingCart size={25}/>
                </span>
            </NavLink>
            <NavLink to="/*">
                <span>
                    <BsFillBellFill size={25}/>
                </span>
            </NavLink>
            <NavLink to="/">
                <span>
                    <ImExit size={25}/>
                </span>
            </NavLink>
           

        </div>
    </div>
  )
}

export default NewSidebar