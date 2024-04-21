function Notification({ message, type }){
    if(message == null){
        return null
    }

    const success = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const error = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return(
        <div style={type == 'success' ? success : error}>
            {message} 
        </div>
    )
}

export default Notification