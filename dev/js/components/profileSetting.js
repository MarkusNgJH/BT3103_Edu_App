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
import UserTable from './userTable';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Search from './search';
 
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
    buttonColorDefault: {
        color: "white",
        background: 'linear-gradient(45deg, #FFBF00 30%, #FACC2E 90%)',
    },
    buttonColorSecondary: {
        color: "white",
        background: 'linear-gradient(45deg, #FF0000 30%, #FF4000 90%)',
    }
});

class profileSetting extends React.Component {
    state = {
        uid: 'default',
        course: 'BT3103',
        snackOpen: false,
        vertical: null,
        horizontal: null,
        message: ""
    };

    handleUIDChange(e) {
        this.setState({ uid: e.target.value})
        // console.log('handleUIDChange')
        if(Object.keys(this.props.firebase.val).indexOf(e.target.value) > -1){
            // this.setState({ course: Object.keys(this.props.firebase.val[e.target.value])[0]})
            this.setState({ course: 'BT3103'})
        }
    }

    handleUIDChange2(e) {
        this.setState({ uid: e})
        // console.log('handleUIDChange ' + this.state.uid)
        if(Object.keys(this.props.firebase.val).indexOf(e) > -1){
            this.setState({ course: 'BT3103'})
        }
    }

    handleChange = () => {
        this.props.changeUid(this.state.uid)
        // console.log("uid is: " + this.state.uid)
        this.props.changecourse(this.state.course)
        // console.log("course is: " + this.state.course)
    };

    handlecourseChange(e) {
        this.setState({ course: e.target.value})
        // console.log(e.target.value)
    }

    componentWillReceiveProps(newProps) {
        if (newProps != this.props) {
            this.props = newProps
        }
      }
    // how to change the state to the right directory
    viewCourses(){
        if(Object.keys(this.props.firebase).length != 0){
            // console.log("ViewCourses")
            // console.log(this.props.firebase)
            var location = (Object.keys(this.props.firebase.val).indexOf(this.state.uid) > -1) ? this.state.uid : 'R6nSbDVly8PUnC6jQFcseDS9sgJ3'; 
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

    handleClose = () => {
        this.setState({ snackOpen: false });
    };

    updateActiveProfile2 = (userDetails, msg, uid, c, r) => {
        this.props.updateActiveProfile(userDetails)

        var newMsg = msg + ":\n" + " -UserId: " + uid + "\n" + " -Course: " + c + "\n" + " -Role: " + r
        this.setState({
            snackOpen: true,
            vertical: 'bottom',
            horizontal: 'right',
            message: newMsg
        })
    }

    buttonColor(val, threshold) {
        if (val > threshold) {
            return this.props.classes.buttonColorDefault
        }
        else {
            return this.props.classes.buttonColorSecondary
        }
    }

    render(){
        const { vertical, horizontal, snackOpen } = this.state;
        return(
            <div>
                <h1>Profile Setting</h1>
                <Card>
                    <CardContent style={{padding: "20px", textAlign:"center"}}>
                    {/* <div style={{ width: '20%', height: 'auto', position: 'relative', margin: '0px auto', padding: '10px', alignItems:"center" }}> */}
                        <h3>Profile Selection Form</h3>
                        <Search id="userId" handleUIDChange2={this.handleUIDChange2.bind(this)} />
                        {/* <FormControl className={styles.formControl} aria-describedby="name-helper-text">
                            <InputLabel htmlFor="name-helper" style={{textAlign:'center'}}>     User ID</InputLabel>
                            <Input id="userId" onChange={this.handleUIDChange.bind(this)} placeholder="Enter your User ID here" />
                        </FormControl> */}

                        <br />
                        <FormControl className={classNames(styles.margin, styles.textField)}>
                            <label>
                                Select your View Type:<br/> 
                                <select name="course" onChange={this.handlecourseChange.bind(this)} onFocus={this.handlecourseChange.bind(this)} className="selectStyle">
                                {this.viewCourses()}
                                </select>
                            </label>
                        </FormControl>

                        <br /> <br />
                        <div style={{textAlign:'center'}}>
                        <Button 
                        variant="raised" 
                        style={{ align: 'center' }} 
                        onClick={() => this.updateActiveProfile2({ uid: this.state.uid, course: this.state.course, role: this.props.firebase.val[this.state.uid][this.state.course]['User Type'] }, "Updated user profile", this.state.uid, this.state.course, this.props.firebase.val[this.state.uid][this.state.course]['User Type'])}
                        className={this.buttonColor(5,2)}
                        >
                        Submit
                        </Button>
                        </div>

                        <br /> <br />
                    {/* </div> */}
                    </CardContent>
                </Card>
                
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    autoHideDuration={2500}
                    disableWindowBlurListener={true}
                    open={this.state.snackOpen}
                    onClose={this.handleClose}
                    message={this.state.message}
                    style={{ height: 'auto', lineHeight: '28px', padding: 24, whiteSpace: 'pre-line' }}
                />
            </div>
        )
    }
}

profileSetting.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{
        firebase: state.firebase,
        activeProfile: state.activeProfile.val
    };
}    

function matchDispatchToProps(dispatch){
    return bindActionCreators({updateActiveProfile: updateActiveProfile}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(profileSetting)); 