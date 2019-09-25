import React, {Component} from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class DashBoard extends Component{
    render(){
        const { projects, auth } = this.props;

        if(!auth.uid) return <Redirect to='/signin'/>

        if(projects){
            return (
                <div className = "dashboard container">
                    <div className="row">
                        <div className="col s12 m8">
                            <ProjectList projects = {projects}/>
                        </div>
                        <div className="col s12 m4">
                            <Notifications/>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 m8">
                            <h1>Loading Projects...</h1>
                        </div>
                    </div>                    
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
    )(DashBoard)