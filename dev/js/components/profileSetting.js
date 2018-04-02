import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateActiveProfile} from '../actions/updateActiveProfile';
import store from '../store';
 
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        flexBasis: 200,
    },
});

class profileSetting extends React.Component {
    state = {
        uid: 'default',
        course: 'BT3103',
    };

    handleUIDChange(e) {
        this.setState({ uid: e.target.value})
        console.log('handleUIDChange')
        if(Object.keys(this.props.firebase.val).indexOf(e.target.value) > -1){
            this.setState({ course: Object.keys(this.props.firebase.val[e.target.value])[0]})
        }
    }

    handleChange = () => {
        this.props.changeUid(this.state.uid)
        console.log("uid is: " + this.state.uid)
        this.props.changecourse(this.state.course)
        console.log("course is: " + this.state.course)
    };

    handlecourseChange(e) {
        this.setState({ course: e.target.value})
        // console.log(e.target.value)
    }

    componentWillReceiveProps(newProps) {
        if (newProps != this.props) {
            this.props = newProps
            // console.log("componentWillReceiveProps")
            // console.log("componentWillReceivePropsFB")
            // console.log(this.props.firebase)
            // console.log("componentWillReceivePropsAP")
            // console.log(this.props.activeProfile)
            // console.log("componentWillReceivePropsAll")
            // console.log(this.props)
            // console.log(store)
        }
      }
    // how to change the state to the right directory
    viewCourses(){
        if(Object.keys(this.props.firebase).length != 0){
            console.log("ViewCourses")
            console.log(this.props.firebase)
            var location = (Object.keys(this.props.firebase.val).indexOf(this.state.uid) > -1) ? this.state.uid : 'R6nSbDVly8PUnC6jQFcseDS9sgJ3'; 
            // console.log(Object.keys(this.props.firebase.val))
            // console.log('location is')
            // console.log(location)
            return (
                // g8odN87wiURjfhqbw1HiMoFIwxn1
                // R6nSbDVly8PUnC6jQFcseDS9sgJ3
                Object.keys(this.props.firebase.val[location]).map((course) => {
                    return(
                        <option key={course} value={course}>
                        {course}    
                        </option>
                    )
                })
            )
        }
        else{
            return (
                <option value={"default"}>
                        default  
                        </option>
            )
        }
    }

    render(){
        return(
            <div>
                <h1>Profile Setting</h1>
                {/* <h2> Props UID: {this.props.activeProfile.uid} </h2>
                <h2> Props Course: {this.props.activeProfile.course} </h2>
                <h2> Props Role{this.props.activeProfile.role} </h2>
                <h2> Local state is {this.state.uid} </h2>
                <h2> Local state is {this.state.course} </h2> */}
                {/* <h2> {this.viewCourses()} </h2> */}
                <div style={{ width: '20%', height: 'auto', position: 'relative', margin: '0px auto', padding: '10px' }}>
                    <FormControl className={styles.formControl} aria-describedby="name-helper-text">
                        <InputLabel htmlFor="name-helper">User ID</InputLabel>
                        <Input id="userId" onChange={this.handleUIDChange.bind(this)} placeholder="Enter your User ID here" />
                    </FormControl>

                    <br /> <br />
                    <FormControl className={classNames(styles.margin, styles.textField)}>
                        <label>
                            Select your View Type:<br/> 
                            <select name="course" onChange={this.handlecourseChange.bind(this)} onFocus={this.handlecourseChange.bind(this)}>
                            {this.viewCourses()}
                            </select>
                        </label>
                        
                        {/* <Input
                            id="adornment-viewType"
                            placeholder="Enter your View Type here"
                        /> */}
                    </FormControl>

                    <br /> <br />
                    <button style={{ float: 'right' }} 
                    onClick={() => this.props.updateActiveProfile({uid: this.state.uid, course: this.state.course, role:this.props.firebase.val[this.state.uid][this.state.course]['User Type']})}>
                    Submit</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        firebase: state.firebase,
        activeProfile: state.activeProfile.val
    };
}    

function matchDispatchToProps(dispatch){
    return bindActionCreators({updateActiveProfile: updateActiveProfile}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(profileSetting); 