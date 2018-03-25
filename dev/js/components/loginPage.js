import React from 'react';
import classNames from 'classnames';
import Login from './login'
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import { FormControl, FormHelperText } from 'material-ui/Form';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    textField: {
        flexBasis: 200,
    },
});

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            showPassword: false
        }
    }
    handleChange() {
        this.setState({ password: event.target.value });
    };

    handleMouseDownPassword() {
        event.preventDefault();
    };

    handleClickShowPasssword() {
        this.setState({ showPassword: !this.state.showPassword });
    };

    render() {
        return (
            <div>
                <Input
                    placeholder="Placeholder"
                    className={styles.margin}
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                />
                <br /> <br />
                <FormControl className={classNames(styles.margin, styles.textField)}>
                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                    <Input
                        id="adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange()}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPasssword.bind(this)}
                                    onMouseDown={this.handleMouseDownPassword.bind(this)}
                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <br /> <br />
                <button onClick={this.props.login}>Log In</button>
            </div>
        )
    }
}

// const LoginPage = () => (
//     <div>
//         <input type="text" placeholder="Enter your UID here" /> <br />
//         <input type="password" placeholder="Enter your password here" /> <br />
//         <button>Enter</button>
//     </div>
// );

export default LoginPage;