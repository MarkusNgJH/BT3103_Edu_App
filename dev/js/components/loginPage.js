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
import profileSetting from './profileSetting';

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

class LoginPage extends React.Component {
    state = {
        password: '',
        showPassword: false,
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPasssword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    render() {
        return (
            <div>
                {/* <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="title" color="inherit" align="center">
                            
                        </Typography>
                    </Toolbar>
                </AppBar> */}

                <div align="center">
                    <img src={ require('../../../public/EduSparksLogo_yel.png') } width="auto" style={{marginBottom: 0}} />
                    <div style={{margin: 50}}>
                        <button className="googleSignInButton" onClick={this.props.login}>Sign in with Google</button>
                    </div>
                </div>

                {/* Old login form */}
                {/* <div style={{ width: '20%', height: 'auto', position: 'relative', margin: '0px auto', padding: '10px' }}>
                    <FormControl className={styles.formControl} aria-describedby="name-helper-text">
                        <InputLabel htmlFor="name-helper">Email</InputLabel>
                        <Input id="email" placeholder="Enter your email here" />
                        <FormHelperText id="email-helper-text">Some important helper text</FormHelperText>
                    </FormControl>

                    <br /> <br />
                    <FormControl className={classNames(styles.margin, styles.textField)}>
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
                            id="adornment-password"
                            placeholder="Enter your password here"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPasssword}
                                        onMouseDown={this.handleMouseDownPassword}
                                    >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <br /> <br />
                    <button style={{ float: 'right' }} onClick={this.props.login}>Log In</button>
                </div> */}
                
            </div>
        )
    }
}

export default LoginPage;