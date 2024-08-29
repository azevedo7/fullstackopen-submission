import { useNotificationValue } from "../NotificationContext"

const Notification = ({ }) => {
  const message = useNotificationValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!message || (message && message.length === 0)) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
