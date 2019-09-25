import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authAction'
import ProfileEdit from '../dashboard/ProfileEdit'

const SignedInLinks = (props) => {
    
    return (
        <ul className = "right">
            <li>
                <NavLink to="/create">Create Recipe</NavLink>
            </li>
            <li>
                <a onClick = {props.signOut}>Log Out</a>
            </li>
            <li>
                <NavLink to="/profile" className='btn btn-floating pink lighten-1'>{props.profile.initials}</NavLink>
            </li>
        </ul>
    ) 
}


const mapDispatchToProps = (dispatch) =>{
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)