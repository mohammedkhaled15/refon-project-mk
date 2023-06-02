import { useEffect, useState } from "react"
import usePrivateRequest from "../hooks/usePrivateRequest"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import "../styles/pages/OrderDetails.scss"
// import { getCookies } from "../utils/manageCookie"

const OrderDetails = () => {

  const privatDbApieRequest = usePrivateRequest()

  const [orderDetails, setOrderDetails] = useState({})

  const track_no = useParams()
  // console.log(track_no)
  const navigate = useNavigate()
  const location = useLocation()
  // const telephone = getCookies("telephone")

  useEffect(() => {
    let isMounted = true
    const Controller = new AbortController()
    const getOrderDetails = async () => {
      try {
        const res = await privatDbApieRequest.post("/order_details", {
          test: "",
          final_tracking_number: track_no.order
        }, { signal: Controller.signal })
        isMounted && setOrderDetails(res.data.data)
      } catch (error) {
        console.log(error)
        navigate("/", { state: { from: location }, replace: true })
      }
    }
    getOrderDetails()
    return () => {
      isMounted = false
      isMounted && Controller.abort()
    }
  }, [location, navigate, track_no.order, privatDbApieRequest])

  console.log(orderDetails)

  return (
    <div className='user__content'>
      <div className="section-title">
        <h2>User Info</h2>
      </div>
      {
        orderDetails && Object.keys(orderDetails).length > 0 && (
          <div className="order__details">
            <div className="order_details__main-img">
              <img src="/images/img-1.svg" alt="" />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default OrderDetails