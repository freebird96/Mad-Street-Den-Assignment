import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProfileEdit from './ProfileEdit'
import { Redirect } from 'react-router-dom'

import {updateProfilePic} from '../../store/actions/authAction'

import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TootTip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField';

import firebase from 'firebase/app'
import 'firebase/storage'
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';





class Profile extends Component {
 

    state = {
        
        profile_pic:'',
        profile_pic_url:'',
        open: false
    };
    

    handleProfilePicUpload = (e) =>{
        const image = e.target.files[0];

        if(image){
            this.setState({
                profile_pic:image.name
            });          
        }

        const storage = firebase.storage();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {
            //shows the progress of the image load...
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            console.log("Error in uploading the pic");
        }, 
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url =>{
                console.log(url);
                this.setState({
                    profile_pic_url: url
                });
                
                const db = firebase.firestore();
        
                db.collection('users').doc(this.props.id).update({
                    ...this.state
                });
                console.log(this.state);
            })
        });
    }

    handleProfilePicure = () =>{
        const fileInput = document.getElementById('profilePic');
        fileInput.click();
    }
       
    render() {
        const {profile, id , auth} = this.props;   
        
        if(!auth.uid) return <Redirect to='/signin'/>
        
        if(profile.profile_pic_url){
            return (
                <div className = "profile-section">
                    <div className="basic-details">
                        <div className="picNbutton">
                            <div className="profileImage">
                                <img src={profile.profile_pic_url? profile.profile_pic_url:"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjQytLKmevkAhVr8HMBHRsFC3cQjRx6BAgBEAQ&url=https%3A%2F%2Fmyrealdomain.com%2Fexplore%2Fempty-profile-picture.html&psig=AOvVaw1f0xU56IQVUeo_A0acIWk1&ust=1569474315430685"} alt="Profie Image" className="profileImage-img"/>
                            </div>
                            <Button color="secondary" variant="contained" onClick ={this.handleProfilePicure} >
                                    <input
                                        type="file"
                                        id="profilePic"
                                        hidden="hidden"
                                        onChange={this.handleProfilePicUpload}
                                        />                            
                                        <AddAPhotoIcon/>
                            </Button>
                        </div>
                    
                        <div className="nameDetails">
                            <h4 className="username">{profile.firstName} {profile.lastName}</h4>
                            <p className="usermailId">{profile.email}</p>
                        </div>
                        <div className="editinfo">
                        {/* BUTTON TO EDIT THE NAME, LAST NAME, HEADLINE, WEBSITE, COUNTRY */}
                            <h6>{profile.headline}</h6>
                            <p>{profile.country}</p>
                            {/* <div className="wesite links">
                                website links...
                            </div> */}
                        </div>
                        <div className="aboutme">
                            <div className="aboutme--content">
                                <h5 className="aboutme--title">About Me</h5>
                                <p className="aboutme--para">{profile.aboutme}</p>
                            </div>                        
                        </div>
                        <div className="profileE--features">
                            <ProfileEdit profile = {profile} id= {id} />
                        </div>
                        
                    </div>

                    <div className="major-details">
                        <div className="workExperience">
                            <h4 className="workExperience--title">Work Experience</h4>
                            <p className="workExperience--para">{profile.workExperience}</p>
                        </div>
                        <div className="educationDetails box">
                            <h4 className="workExperience--title">Education Details</h4>
                            <p className="workExperience--para">{profile.education}</p>
                        </div>
                        <div className="acheivements box">
                            <h4 className="workExperience--title">acheivements</h4>
                            <p className="workExperience--para">{profile.acheivements}</p>
                        </div>
                    </div>                
                </div>
            )
        }else{
            return (

                <div className = "container center">
                    <h3>Loading Profile....</h3>
                </div>

            )
        }
    }
}

const mapStateToProps = (state,ownProps) => {
    const id = state.firebase.auth.uid;
    console.log(state.firebase);
    return {
        profile : state.firebase.profile,
        auth: state.firebase.auth,
        id
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateProfilePic: (profile) => dispatch(updateProfilePic(profile))
//     }
// }

export default connect(mapStateToProps)(Profile)
