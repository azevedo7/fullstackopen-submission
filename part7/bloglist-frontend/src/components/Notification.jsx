import { useSelector, useDispatch } from "react-redux"
import { clear } from "../slices/notificationSlice"
const confirmStyle = {
  color: "green",
  borderColor: "green",
}

const errorStyle = {
  color: "red",
  borderColor: "red",
}

const confirm = (message) => {
  return (
    <div className="toast z-50">
      <div className="alert alert-success text-base" >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {message}
      </div>
    </div>
  )
}

const error = (message) => {
  return (
    <div className="toast z-50">
      <div className="alert alert-error text-base" >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {message}
      </div>
    </div>
  )
}

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.message) return null

  if(notification.type === 'error') {
    return error(notification.message)
  }

  return confirm(notification.message)
}

export default Notification
