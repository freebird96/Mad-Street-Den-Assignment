import React, { Component, Fragment } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

import TootTip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit'

class ProfileEdit extends Component {
    state = {
        firstName: '',
        lastName:'',
        headline:'',
        website:'',
        country: '',
        aboutme:'',
        workExperience:'',
        profile_pic_url:'',
        open: false
    };

    // -----------------------------------------------------------------------
    // HANDLE CHANGES
    // -----------------------------------------------------------------------
    handleFirstNameChange = (e) => {
        // console.log(e.target.value);
        this.setState({
            firstName: e.target.value
        })
    }

    handleLastNameChange = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }

    handleHeadlineNameChange = (e) =>{
        this.setState({
            headline: e.target.value
        })
    }

    handleCountryNameChange = (e) => {
        this.setState({
            country: e.target.value
        })
    }

    handleAboutMeChange = (e) => {
        this.setState({
            aboutme: e.target.value
        })
    }

    handleWorkExperienceChange = (e) => {
        this.setState({
            workExperience: e.target.value
        })
    }

    handleEducationChange = (e) => {
        this.setState({
            education: e.target.value
        })
    }

    handleAcheivementsChange = (e) => {
        this.setState({
            acheivements: e.target.value
        })
    }


    // -----------------------------------------------------------------------
    // HANDLE SUBMITS
    // ------------------------------------------------------------------------

    handleSubmit =() => {        
        const db = firebase.firestore();
        
        db.collection('users').doc(this.props.id).update({
            ...this.state
        });
        this.handleClose();
        // console.log(this.props.id)
    }

    handleOpen = () =>{
        this.setState({
            open: true
        })
        console.log(this.props.profile);
        console.log(this.state);
        this.mapProfileDetailsToState();
    }

    handleClose = () => {
        this.mapProfileDetailsToState();
        this.setState({
            open:false
        })       
    }

    

    componentDidMount(){
        this.mapProfileDetailsToState();
        // console.log(this.props)
    }

    mapProfileDetailsToState = () => {
        this.setState({
            firstName: this.props.profile.firstName? this.props.profile.firstName:'',
            lastName: this.props.profile.lastName? this.props.profile.lastName:'',
            headline: this.props.profile.headline? this.props.profile.headline:'',
            website: this.props.profile.website? this.props.profile.website:'',
            country: this.props.profile.country? this.props.profile.country:'',
            aboutme: this.props.profile.aboutme? this.props.profile.aboutme:'',
            workExperience: this.props.profile.workExperience? this.props.profile.workExperience:'',
            education: this.props.profile.education? this.props.profile.education:'',
            acheivements: this.props.profile.acheivements? this.props.profile.acheivements:'',
            profile_pic_url: this.props.profile.profile_pic_url? this.props.profile.profile_pic_url:'',
        })
    }




    render() {
        return (
            <Fragment>
                <TootTip title="Edit Info" placement="top">
                        <Button onClick={this.handleOpen} className="profileEdit--button">
                            <EditIcon/><span className="editButton--editInfo">edit info</span>
                        </Button>
                    </TootTip>
                    <Dialog
                        open={this.state.open}
                        onClose = {this.handleClose}
                        fullWidth
                        maxWidth = "sm"
                    >
                        <DialogTitle>Edit the details</DialogTitle>
                        <DialogContent>
                            <form className="profileEditForm">
                                <TextField
                                    name="firstName"
                                    type="text"
                                    label="FirstName"
                                    placeholder="First Name"
                                    value = {this.state.firstName}
                                    onChange = {(e) =>this.handleFirstNameChange(e)}
                                    multiline
                                    fullWidth
                                    variant="outlined"
                                    id="outlined-email-input"
                                />
                                <TextField
                                    name="lastName"
                                    type="text"
                                    label="LastName"
                                    placeholder="Last Name"
                                    value = {this.state.lastName}
                                    onChange = {(e) =>this.handleLastNameChange(e)}
                                    multiline
                                    fullWidth
                                    variant="outlined"
                                    id="outlined-email-input"
                                />
                                <TextField
                                    name="headline"
                                    type="text"
                                    label="Headline"
                                    placeholder="First Name"
                                    value = {this.state.headline}
                                    onChange = {(e) =>this.handleHeadlineNameChange(e)}
                                    multiline
                                    fullWidth
                                    variant="outlined"
                                    id="outlined-email-input"
                                />
                                <TextField
                                    name="countryName"
                                    type="text"
                                    label="Country Name"
                                    placeholder="Country Name"
                                    value = {this.state.country}
                                    onChange = {(e) =>this.handleCountryNameChange(e)}
                                    multiline
                                    // rows="4"
                                    fullWidth
                                    variant="outlined"
                                    id="outlined-email-input"
                                />
                                <TextField
                                    name="aboutme"
                                    type="text"
                                    label="About Me"
                                    placeholder="About Me"
                                    value = {this.state.aboutme}
                                    onChange = {(e) =>this.handleAboutMeChange(e)}
                                    multiline
                                    rows="5"
                                    fullWidth
                                    variant="outlined"
                                    id="outlined-email-input"
                                />
                                <TextField
                                    name="workExperience"
                                    type="text"
                                    label="Work Experience"
                                    placeholder="Work Experience"
                                    value = {this.state.workExperience}
                                    onChange = {(e) =>this.handleWorkExperienceChange(e)}
                                    multiline
                                    rows="5"
                                    fullWidth
                                    variant="outlined"
                                    id="outlined-email-input"
                                />
                                <TextField
                                    name="education"
                                    type="text"
                                    label="Education"
                                    placeholder="Education"
                                    value = {this.state.education}
                                    onChange = {(e) =>this.handleEducationChange(e)}
                                    multiline
                                    rows="5"
                                    fullWidth
                                    variant="outlined"
                                    id="outlined-email-input"
                                />
                                <TextField
                                    name="acheivements"
                                    type="text"
                                    label="Acheivements"
                                    placeholder="Acheivements"
                                    value = {this.state.acheivements}
                                    onChange = {(e) =>this.handleAcheivementsChange(e)}
                                    multiline
                                    rows="5"
                                    fullWidth
                                    variant="outlined"
                                    id="outlined-email-input"
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>
        )
    }
}

export default ProfileEdit

