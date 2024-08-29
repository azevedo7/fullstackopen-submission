import { createContext, useContext, useReducer} from "react";

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload
    case "CLEAR_NOTIFICATION":
      return ""
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(NotificationReducer, '') 

    return(
      <NotificationContext.Provider value={[notification, notificationDispatch]} >
        {props.children}
      </NotificationContext.Provider>
    )

}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0] 
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1] 
}

export const createNotification = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    payload: notification
  }
}

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION"
  }
}

export const newNotification = (dispatch, message, time) => {
  dispatch(createNotification(message))
  setTimeout(() => {
    dispatch(clearNotification())
  }, time * 1000)
}

export default NotificationContext