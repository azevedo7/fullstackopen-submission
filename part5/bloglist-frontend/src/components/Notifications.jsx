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

export default { confirm, error }