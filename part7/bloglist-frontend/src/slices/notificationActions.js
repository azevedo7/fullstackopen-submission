import { set, clear } from "./notificationSlice";

export const errorNotification = (message) => {
  return (dispatch) => {
    dispatch(set({ message, type: "error" })); // Dispatch another thunk action
    
    setTimeout(() => {
      dispatch(clear()); // Dispatch clear after 5 seconds
    }, 5000);
  };
};

// Thunk action for confirm notification
export const confirmNotification = (message) => {
  return (dispatch) => {
    dispatch(set({ message, type: "confirm" })); // Dispatch another thunk action
    
    setTimeout(() => {
      dispatch(clear()); // Dispatch clear after 5 seconds
    }, 5000);
  };
};
