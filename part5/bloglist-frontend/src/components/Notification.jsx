const Notification = ({ message,colour }) => {
    const msgStyle = {
        color: colour,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
      return null
    }
  
    return (
      <div style ={msgStyle}>
        {message}
      </div>
    )
  }
  
  export default Notification