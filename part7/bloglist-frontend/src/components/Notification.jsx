import { useSelector, useDispatch } from "react-redux"
import { clear } from "../slices/notificationSlice"
const confirmStyle = {
  color: "green",
  borderColor: "green"
}

const errorStyle = {
  color: "red",
  borderColor: "red"
}

const confirm = message => {
  return (
    <div className="notification" style={confirmStyle}>{message}</div>
  )
}

const error = message => {
  return (
    <div className="notification" style={errorStyle}>{message}</div>
  )
}

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if(!notification.message) return null

  if(notification.type === 'error') {
    return error(notification.message)
  }

  return confirm(notification.message)
}

export default Notification