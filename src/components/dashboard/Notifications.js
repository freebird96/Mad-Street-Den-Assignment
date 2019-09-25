import React from 'react'

const Notifications = (props) =>{
    return (
        <div className = "section">
            <div className="card z-depth-0">
                <div className="card-content notificationCard">
                    <h4 className="notification--title">Activities</h4>
                    <ul className="notificationsList">
                        <li className = "notificationList--item">Sam has signed up </li>
                        <li className = "notificationList--item">The rasmalai recipe has been published</li>
                        <li className = "notificationList--item">John has signed up</li>
                        <li className = "notificationList--item">Adwaith has signed up</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Notifications