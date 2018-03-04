import React from 'react'

const Notification = (props) => {
    if (props.msg) {
        return (
            <div class="notification">{props.msg}</div>
        )
    } else {
        return ( <div></div>)
    }
}

export default Notification