import Login from './login'
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

class LoginPage extends React.Component {
    state = {
        uid: '',
    };

    handleuid = prop => event => {
        var uid = event.email.value; // How to get the value from Input? 
        console.log(uid)
        this.setState({ [prop]: event.target.value });
    };

    render() {
        return (
            <div className={styles.container}>
                <FormControl className={styles.formControl} aria-describedby="name-helper-text">
                    <InputLabel htmlFor="name-helper">User ID</InputLabel>
                    <Input id="email" placeholder="Enter your user ID here" />
                    <FormHelperText id="email-helper-text">Enter your User ID</FormHelperText>
                </FormControl>

                <br /> <br />
                <button onClick={this.handleuid.bind(this)}>Show my Charts</button>

            </div>
        )
    }
}

export default LoginPage;