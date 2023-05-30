import { useEffect , useState } from "react"
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import NewSidebar from "../components/NewSidebar"

const SharedLayout = ({children}) => {
  
  return (
    <div className='profile'>
      <Sidebar/>
      <NewSidebar/>
      <Outlet/>

    </div>
  )
}

export default SharedLayout