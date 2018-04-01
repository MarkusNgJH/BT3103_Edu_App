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
import UsersTable from '../containers/users-table';

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
        uid: '',
        view: false,
    };

    handleUIDChange(e) {
        // store.dispatch({ type: "SET_VAL_uid", payload: e.target.value });
        // console.log(store.getState());
        this.setState({ uid: e.target.value})
        console.log(e.target.value)
    }

    handleChange = () => {
        // store.dispatch({ type: "SET_VAL_uid", payload: this.state.uid });
        // console.log("uid is: " + this.state.uid)
        // Sends uid to database to pull the correct user info 
        this.props.changeUid(this.state.uid)
        console.log("uid is: " + this.state.uid)
        this.props.changeView(this.state.view)
        console.log("View is: " + this.state.view)

    };

    handleViewChange(e) {
        this.setState({ view: e.target.value})
        console.log(e.target.value)
    }

    render(){
        return(
            <div>
                <h1>This is profile setting page</h1>
                <div style={{ width: '20%', height: 'auto', position: 'relative', margin: '0px auto', padding: '10px' }}>
                    <FormControl className={styles.formControl} aria-describedby="name-helper-text">
                        <InputLabel htmlFor="name-helper">User ID</InputLabel>
                        <Input id="userId" onChange={this.handleUIDChange.bind(this)} placeholder="Enter your User ID here" />
                    </FormControl>

                    <br /> <br />
                    <FormControl className={classNames(styles.margin, styles.textField)}>
                        <label>
                            Select your View Type
                            <select name="view" onChange={this.handleViewChange.bind(this)}>
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                            <option value="adminstrator">Administrator</option>
                            </select>
                        </label>
                        
                        {/* <Input
                            id="adornment-viewType"
                            placeholder="Enter your View Type here"
                        /> */}
                    </FormControl>

                    <br /> <br />
                    <button style={{ float: 'right' }} onClick={this.handleChange.bind(this)} >Submit</button>
                </div>
                <UsersTable />
            </div>
        )
    }
}


export default profileSetting;