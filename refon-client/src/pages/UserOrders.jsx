import { useEffect, useState } from "react"
import usePrivateRequest from "../hooks/usePrivateRequest"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getCookies } from "../utils/manageCookie";
import "../styles/pages/UserOrders.scss"

const UserOrders = () => {

  const privateDbApiRequest = usePrivateRequest()

  const [userOrders, setUserOrders] = useState({})
  const telephone = getCookies("telephone")

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    let isMounted = true
    const Controller = new AbortController()
    const getUserOrders = async () => {
      try {
        const res = await privateDbApiRequest.post("/orders_list", { list: '1', test: '1', telephone }, { signal: Controller.signal })
        console.log(res)
        isMounted && setUserOrders(res.data.data.data)
      } catch (error) {
        console.log(error)
        navigate("/", { state: { from: location }, replace: true })
      }
    }
    getUserOrders()
    return () => {
      isMounted = false
      isMounted && Controller.abort()
    }
  }, [location, navigate, privateDbApiRequest, telephone])

  console.log(userOrders)

  return (
    <div className='user__content'>
      <div className="section-title">
        <h2>User Orders</h2>
      </div>
      {
        userOrders && Object.keys(userOrders).length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Thoub Type</TableCell>
                  <TableCell align="right">Order No</TableCell>
                  <TableCell align="right">Layaway No</TableCell>
                  <TableCell align="right">Final Tracking No</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userOrders &&
                  userOrders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <Link
                          style={{ color: '#000', textDecoration: 'underline', padding: '5px' }}
                          to={`/orderDetails/${order.final_tracking_number}`}
                        >
                          {order['Thoub Type']}
                        </Link>
                      </TableCell>
                      <TableCell align="right">{order['Job Order No']}</TableCell>
                      <TableCell align="right">{order['Layaway No']}</TableCell>
                      <TableCell align="right">{order.final_tracking_number}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
    </div>
  )
}

export default UserOrders