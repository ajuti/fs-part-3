const Notification = ({msg, error}) => {
  if (msg === null) {
    return null
  }

  return (
    <div className={error ? "error" : "notification"}>
      {msg}
    </div>
  )  
}

export default Notification