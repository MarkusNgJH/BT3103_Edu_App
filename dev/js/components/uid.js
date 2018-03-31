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
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import AppFrame from './AppFrame';
import store from "../store";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    formControl: {
        margin: theme.spacing.unit,
        alignSelf: 'center',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class UidPage extends React.Component {

    handleChange(e) {
        // store.dispatch({ type: "SET_VAL_uid", payload: e.target.value });
        // console.log(store.getState());
        this.setState({ uid: e.target.value })
        console.log(e.target.value)
    }

    handleUID = () => {
        // store.dispatch({ type: "SET_VAL_uid", payload: this.state.uid });
        // console.log("uid is: " + this.state.uid)
        // Sends uid to database to pull the correct user info 
        this.props.changeUid(this.state.uid)
        console.log("uid is: " + this.state.uid)

    };

    render() {

        return (
            <div style={{ width: '30%', height: 'auto', position: 'relative', margin: '0px auto', padding: '10px' }}>
                <FormControl className={styles.formControl} aria-describedby="name-helper-text">
                    <InputLabel htmlFor="name-helper">User ID</InputLabel>

                    <Input id="email" onChange={this.handleChange.bind(this)} placeholder="Enter your user ID here" />

                    <FormHelperText id="email-helper-text">Enter your User ID</FormHelperText>
                </FormControl>

                <br /> <br />
                <button style={{ float: 'right' }} onClick={this.handleUID.bind(this)}>Show my Charts</button>
            </div>
        )
    }
}

export default UidPage;